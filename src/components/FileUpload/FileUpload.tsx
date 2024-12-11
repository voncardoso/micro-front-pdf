import React, { useCallback } from 'react';
import { FileX, Paperclip, Upload } from 'lucide-react';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from '../../types/compliance';

interface FileUploadProps {
  files: File[];
  onChange: (files: File[]) => void;
  error?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({ files, onChange, error }) => {
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      const droppedFiles = Array.from(e.dataTransfer.files).filter(file => {
        return (
          ALLOWED_FILE_TYPES.includes(file.type as any) &&
          file.size <= MAX_FILE_SIZE
        );
      });
      onChange([...files, ...droppedFiles]);
    },
    [files, onChange]
  );

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files).filter(file => {
        return (
          ALLOWED_FILE_TYPES.includes(file.type as any) &&
          file.size <= MAX_FILE_SIZE
        );
      });
      onChange([...files, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    onChange(newFiles);
  };

  return (
    <div className="space-y-4">
      <div
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          multiple
          accept={ALLOWED_FILE_TYPES.join(',')}
          onChange={handleFileInput}
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-12 w-12 text-gray-400 mb-2" />
          <span className="text-sm text-gray-600">
            Drag and drop files here or click to browse
          </span>
          <span className="text-xs text-gray-500 mt-1">
            Supported formats: PDF, DOCX, JPG, PNG (max 10MB)
          </span>
        </label>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 bg-gray-50 rounded"
            >
              <div className="flex items-center">
                <Paperclip className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">{file.name}</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700"
              >
                <FileX className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};