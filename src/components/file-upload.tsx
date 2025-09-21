
'use client'
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileUp, X, FileText } from 'lucide-react';

const FileUpload = ({ onFileUrlChange }: { onFileUrlChange: (url: string) => void }) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const fileUrl = URL.createObjectURL(file);
    setUploadedFile(file);
    onFileUrlChange(fileUrl);
  }, [onFileUrlChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const removeFile = () => {
    setUploadedFile(null);
    onFileUrlChange('');
  };

  if (uploadedFile) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-white rounded-lg p-6 text-center">
        <FileText className="w-20 h-20 text-blue-500 mb-4" />
        <p className="text-xl font-semibold mb-2">{uploadedFile.name}</p>
        <p className="text-gray-500 mb-6">Your document is ready to be analyzed.</p>
        <button onClick={removeFile} className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
          <X className="w-5 h-5" />
          <span>Remove File</span>
        </button>
      </div>
    );
  }

  return (
    <div {...getRootProps()} className={`w-full h-full flex flex-col items-center justify-center p-8 border-4 border-dashed rounded-xl transition-colors ${isDragActive ? 'bg-blue-50 border-blue-400' : 'bg-slate-50 border-slate-300 hover:border-slate-400'}`}>
      <input {...getInputProps()} />
      <FileUp className="w-16 h-16 text-slate-400 mb-6" />
      <h2 className="text-2xl font-bold text-slate-700 mb-2">Drag & Drop Your Document</h2>
      <p className="text-slate-500">or click to browse your files</p>
    </div>
  );
};

export default FileUpload;
