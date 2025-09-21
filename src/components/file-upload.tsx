
'use client'
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp } from 'lucide-react';

const FileUpload = ({ onFileUrlChange }: { onFileUrlChange: (url: string) => void }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setUploadedFile(file);
    onFileUrlChange(fileUrl);
  }, [onFileUrlChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
      <div {...getRootProps()} className="flex items-center justify-center w-full h-full p-4 border-2 border-dashed rounded-lg cursor-pointer bg-white border-gray-300 hover:bg-gray-50">
        <input {...getInputProps()} />
        {uploadedFile ? (
          <div>
            <p className="text-lg font-semibold">File uploaded:</p>
            <p>{uploadedFile.name}</p>
          </div>
        ) : (
          <div className="text-center">
            <FileUp className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            {isDragActive ? (
              <p className="text-lg text-gray-600">Drop the files here ...</p>
            ) : (
              <p className="text-lg text-gray-600">Drag &apos;n&apos; drop some files here, or click to select files</p>
            )}
          </div>
        )}
      </div>
    );
};

export default FileUpload;
