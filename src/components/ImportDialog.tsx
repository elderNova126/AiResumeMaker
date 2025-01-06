import React, { useState, useRef, useEffect } from 'react';
import { X, AlertCircle, FileUp } from 'lucide-react';
import { parsePDFContent, mapToTemplate, initializePDFWorker } from '../utils/resumeParser';

interface ImportDialogProps {
  onClose: () => void;
  onImport: (data: Record<string, string>) => void;
}

const ImportDialog = ({ onClose, onImport }: ImportDialogProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize PDF.js worker when component mounts
  useEffect(() => {
    initializePDFWorker().catch(error => {
      console.error('Failed to initialize PDF parser:', error);
      setError('PDF parser initialization failed. Please try again.');
    });
  }, []);

  useEffect(() => {
    // Automatically trigger file input when dialog opens
    // if (fileInputRef.current) {
    //   fileInputRef.current.click();
    // }
  }, []);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset file input to allow re-uploading the same file
    event.target.value = '';
    
    // Add file size check
    const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
    if (file.size > MAX_FILE_SIZE) {
      setError('File size exceeds 10MB limit');
      return;
    }

    if (!file.type.includes('pdf')) {
      setError('Please upload a PDF file');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      console.log('Starting PDF processing...');
      console.log('Processing file:', file.name, 'Size:', file.size);
      const extractedData: ResumeData = await parsePDFContent(file);
      console.log('Extracted data:', extractedData);
      
      const mappedData = mapToTemplate(extractedData);
      onImport(mappedData);
      onClose();
    } catch (err) {
      console.error('PDF parsing error:', err);
      setError('Failed to parse resume. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Import Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span className="text-sm">{error}</span>
          </div>
        )}

        <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          isProcessing ? 'border-emerald-300 bg-emerald-50' : 'border-gray-300'
        }`}>
          <input
            type="file"
            accept=".pdf"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
            id="pdf-upload"
          />
          <label
            htmlFor="pdf-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <FileUp className="h-12 w-12 text-gray-400 mb-4" />
            <span className="text-sm text-gray-600">
              {isProcessing ? 'Processing...' : 'Click to upload PDF resume'}
            </span>
          </label>
        </div>

        <p className="mt-4 text-xs text-gray-500 text-center">
          Supported format: PDF
        </p>
      </div>
    </div>
  );
};

export default ImportDialog;