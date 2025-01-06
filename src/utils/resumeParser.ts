import * as PDFJS from 'pdfjs-dist';
import type { ResumeData, ResumeSection } from '../types/resume';
import { initializeWorker } from './pdfWorker';

// Add error handling and logging
let isWorkerInitialized = false;

export const initializePDFWorker = async (): Promise<void> => {
  if (isWorkerInitialized) return;
  
  try {
    await initializeWorker();
    isWorkerInitialized = true;
  } catch (error) {
    console.error('Failed to initialize PDF.js worker:', error);
    throw new Error('PDF parser initialization failed');
  }
};

const analyzeContent = (content: string): ResumeData => {
  const sections: Record<ResumeSection, RegExp> = {
    summary: /(?:SUMMARY|PROFILE|OBJECTIVE)(?:\s*:|\n)([\s\S]*?)(?=\n\s*(?:[A-Z\s]{2,}:|$))/i,
    experience: /(?:EXPERIENCE|EMPLOYMENT|WORK HISTORY)(?:\s*:|\n)([\s\S]*?)(?=\n\s*(?:[A-Z\s]{2,}:|$))/i,
    education: /(?:EDUCATION|ACADEMIC|QUALIFICATIONS)(?:\s*:|\n)([\s\S]*?)(?=\n\s*(?:[A-Z\s]{2,}:|$))/i,
    skills: /(?:SKILLS|EXPERTISE|COMPETENCIES)(?:\s*:|\n)([\s\S]*?)(?=\n\s*(?:[A-Z\s]{2,}:|$))/i,
    languages: /(?:LANGUAGES|LANGUAGE SKILLS)(?:\s*:|\n)([\s\S]*?)(?=\n\s*(?:[A-Z\s]{2,}:|$))/i,
  };

  const extractedData: Partial<ResumeData> = {};

  // Extract contact information
  const emailMatch = content.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/i);
  const phoneMatch = content.match(/(\+?[\d\s-]{10,})/);
  const websiteMatch = content.match(/(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?)/i);
  const linkedinMatch = content.match(/(?:linkedin\.com\/in\/|linkedin:)\s*([a-zA-Z0-9-]+)/i);

  extractedData.contact = {
    email: emailMatch?.[1] || '',
    phone: phoneMatch?.[1] || '',
    website: websiteMatch?.[1] || '',
    linkedin: linkedinMatch?.[1] || '',
  };

  // Extract sections
  Object.entries(sections).forEach(([key, regex]) => {
    const match = content.match(regex);
    if (match?.[1]) {
      extractedData[key as ResumeSection] = match[1].trim();
    }
  });

  return extractedData as ResumeData;
};

export const parsePDFContent = async (file: File): Promise<ResumeData> => {
  try {
    // Ensure worker is initialized
    if (!isWorkerInitialized) {
      await initializePDFWorker();
    }

    const arrayBuffer = await file.arrayBuffer();
    console.log('Processing PDF file:', file.name, 'Size:', file.size);
    
    const loadingTask = await PDFJS.getDocument({
      data: arrayBuffer,
      useWorkerFetch: true,
      isEvalSupported: true,
      useSystemFonts: true,
      cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/cmaps/',
      cMapPacked: true,
    });

    const pdf = await loadingTask.promise;
    console.log('PDF loaded successfully, pages:', pdf.numPages);
    
    let fullText = '';
    
    // Extract text from all pages
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Processing page ${i}/${pdf.numPages}`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n';
    }

    console.log('Text extraction complete, analyzing content...');
    return analyzeContent(fullText);
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
};

export const mapToTemplate = (data: ResumeData | null): Record<string, string> => {
  if (!data) {
    return {
      'contact.email': '',
      'contact.phone': '',
      'contact.website': '',
      'contact.linkedin': '',
      'summary': '',
      'experience': '',
      'education': '',
      'skills': '',
      'languages': '',
    };
  }

  return {
    'contact.email': data.contact?.email || '',
    'contact.phone': data.contact?.phone || '',
    'contact.website': data.contact?.website || '',
    'contact.linkedin': data.contact?.linkedin || '',
    'summary': data.summary?.trim() || '',
    'experience': data.experience?.trim() || '',
    'education': data.education?.trim() || '',
    'skills': data.skills?.trim() || '',
    'languages': data.languages?.trim() || '',
  };
};