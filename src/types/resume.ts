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

export interface ExperienceType {
  company?: string;
  dateRange?: string;
  position?: string;
  location?: string;
  description?: string[];
}

export interface EducationType {
  school: string;
  dateRange: string;
  degree: string;
}

export interface HobbyType {
  name: string;
}

export interface LanguageType {
  name: string;
}

export interface SkillType {
  skillname: string;
}

export interface DataType {
  Name?: string;
  Role?: string;
  Location?: string;
  Email?: string;
  Phone?: string;
  Website?: string;
  Linkedin?: string;
  Other?: string;
  Profile?: string;
  Skill?: SkillType[];
  Language?: LanguageType[];
  Interest?: HobbyType[];
  Experience?: ExperienceType[];
  Education?: EducationType[];
}