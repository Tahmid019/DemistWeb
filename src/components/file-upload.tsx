
'use client'
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';

const FileUpload = ({ onTextExtracted }: { onTextExtracted: (text: string, name: string) => void }) => {

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('File upload failed');
      }

      const data = await response.json();
      onTextExtracted(data.text, file.name);
    } catch (error) {
      console.error(error);
    }
  }, [onTextExtracted]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={`flex h-full w-full cursor-pointer items-center justify-center rounded-lg border-2 border-dashed transition-colors ${isDragActive ? 'border-blue-500 bg-gray-800' : 'border-gray-600 bg-gray-900 hover:border-gray-500'}`}>
      <input {...getInputProps()} />
      <div className="text-center">
        <FileUp className="mx-auto h-12 w-12 text-gray-400" />
        <p className="mt-4 text-lg text-gray-400">
          {isDragActive ? 'Drop the files here...' : 'Drag & drop a PDF here, or click to select'}
        </p>
      </div>
    </div>
  );
};

export default FileUpload;
