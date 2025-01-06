import * as PDFJS from 'pdfjs-dist';

const initializeWorker = async (): Promise<void> => {
  try {
    // Use CDN worker for better compatibility
    PDFJS.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;
    console.log('PDF.js worker initialized successfully');
  } catch (error) {
    console.error('Failed to initialize PDF.js worker:', error);
    throw new Error('PDF worker initialization failed');
  }
};

export { initializeWorker };