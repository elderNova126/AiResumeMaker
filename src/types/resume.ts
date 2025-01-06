export type ResumeSection = 'summary' | 'experience' | 'education' | 'skills' | 'languages';

export interface ContactInfo {
  email: string;
  phone: string;
  website: string;
  linkedin: string;
}

export interface ResumeData {
  contact?: ContactInfo;
  summary?: string;
  experience?: string;
  education?: string;
  skills?: string;
  languages?: string;
}