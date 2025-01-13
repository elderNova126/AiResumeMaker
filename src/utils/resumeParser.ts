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

export const parsePDFContent = async (file: File) => {
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
    // return analyzeContent(fullText);+
    return fullText;
  } catch (error) {
    console.error('Error parsing PDF:', error);
    throw error;
  }
};

export  const  mapToTemplate = async (resumeText: string | null)=> {
  const data = {};
  if (!resumeText) {
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
  

  data.name = resumeText.match(/- \*\*Name:\*\* (.*)/)?.[1]?.trim() || resumeText.match(/- \*\*Name\*\*: (.*)/)?.[1]?.trim();
  
  data.role = resumeText.match(/- \*\*Role:\*\* (.*)/)?.[1]?.trim() || resumeText.match(/- \*\*Role\*\*: (.*)/)?.[1]?.trim();
  data.location = resumeText.match(/- \*\*Location:\*\* (.*)/)?.[1]?.trim() || resumeText.match(/- \*\*Location\*\*: (.*)/)?.[1]?.trim();
  data.email = resumeText.match(/- \*\*Email:\*\* (.*)/)?.[1]?.trim() || resumeText.match(/- \*\*Email\*\*: (.*)/)?.[1]?.trim();
  data.phone = resumeText.match(/- \*\*Phone Number:\*\* (.*)/)?.[1]?.trim() || resumeText.match(/- \*\*Phone Number\*\*: (.*)/)?.[1]?.trim();
  data.website = resumeText.match(/- \*\*Website Address:\*\* (.*)/)?.[1]?.trim() || resumeText.match(/- \*\*Website Address\*\*: (.*)/)?.[1]?.trim();
  data.linkedin = resumeText.match(/- \*\*LinkedIn Address\*\*: (.*)/)?.[1]?.trim() || resumeText.match(/- \*\*LinkedIn address:\*\* (.*)/)?.[1]?.trim();
  data.profile = resumeText.match(/- \*\*Profile Summary:\*\* ([\s\S]*?)(?=- \*\*Work Experience:)/)?.[1]?.trim() || resumeText.match(/- \*\*Profile Summary\*\*:([\s\S]*?)(?=- \*\*Work Experience\*\*:)/)?.[1]?.trim();

  const workExperienceMatches = Array.from(
    resumeText.matchAll(
      /- \*\*Company Name\*\*: (.*)\n\s*- \*\*Position\*\*: (.*)\n\s*- \*\*Period\*\*: (.*)\n\s*- \*\*Description\*\*:([\s\S]*?)(?=\n\s*- \*\*|\n$)/g
    )
  );
  let workExperience = workExperienceMatches.map((match) => ({
    companyName: match[1]?.trim(),
    position: match[2]?.trim(),
    period: match[3]?.trim(),
    description: match[4]?.trim().split("\n").map((desc) => desc.replace(/^\s*- /, "").trim()),
  }));
  if(workExperience.length==0){
      const workExperienceMatches = Array.from(
        resumeText.matchAll(/- \*\*Company Name:\*\* (.*)\n\s*- \*\*Position:\*\* (.*)\n\s*- \*\*Period:\*\* (.*)\n\s*- \*\*Description:\*\*([\s\S]*?)(?=\n\s*- \*\*|\n$)/g)
      );
      workExperience = workExperienceMatches.map((match) => ({
        companyName: match[1]?.trim(),
        position: match[2]?.trim(),
        period: match[3]?.trim(),
        description: match[4]?.trim().split('\n').map((desc) => desc.replace(/^\s*- /, '').trim()),
      }));
    }
    
    data.experience=workExperience;

    
    let skills = resumeText.match(/- \*\*Skills\*\*:([\s\S]*?)(?=- \*\*Education\*\*:)/)?.[1]?.trim().split("\n").map((skill) => skill.trim()) || [];
    if(skills.length==0){
      skills = resumeText.match(/- \*\*Skills:\*\*([\s\S]*?)(?=- \*\*Education:\*\*)/)?.[1]?.trim().split("\n").map((skill) => skill.trim()) || [];
    }
    data.skill=skills;

    const educationMatches = Array.from(
      resumeText.matchAll(/- \*\*School Name:\*\* (.*)\n\s*- \*\*Degree:\*\* (.*)\n\s*- \*\*Period:\*\* (.*)/g)
    );
    let education = educationMatches.map((match) => ({
      schoolName: match[1]?.trim(),
      degree: match[2]?.trim(),
      period: match[3]?.trim(),
    }));
    if(education.length==0){
      const educationMatches = Array.from(
        resumeText.matchAll(/- \*\*School Name\*\*: (.*)\n\s*- \*\*Degree\*\*: (.*)\n\s*- \*\*Period\*\*: (.*)/g)
      );
      education = educationMatches.map((match) => ({
        schoolName: match[1]?.trim(),
        degree: match[2]?.trim(),
        period: match[3]?.trim(),
      }));
    }
    data.edu=education;
    const languagesMatches = Array.from(
      resumeText.matchAll(/- \*\*Language Name:\*\* (.*)\n\s*- \*\*Level:\*\* (.*)/g)
    );
    let languages = languagesMatches.map((match) => ({
      languageName: match[1]?.trim(),
      level: match[2]?.trim(),
    }));
    if(languages.length==0){
      const languagesMatches = Array.from(
        resumeText.matchAll(/- \*\*Language Name\*\*: (.*)\n\s*- \*\*Level\*\*: (.*)/g)
      );
      languages = languagesMatches.map((match) => ({
        languageName: match[1]?.trim(),
        level: match[2]?.trim(),
      }));
    }
    data.lng=languages;
  console.log("ddddddddddddddddddddddddddddd",data)
  return data;
 
};