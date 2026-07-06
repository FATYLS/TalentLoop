export interface User {
  email: string;
  name: string;
  credits: number;
  provider?: "email" | "google";
  avatar?: string;
}

export interface Prospect {
  id: string;
  name: string;
  sector: string;
  city: string;
  size: string;
  email?: string;
  website?: string;
  employees?: string;
  status: "new" | "enriched" | "contacted";
}

export interface Campaign {
  id: string;
  name: string;
  prospects: number;
  sent: number;
  status: "draft" | "sending" | "done";
  createdAt: string;
  letter?: string;
}

export interface Education {
  id: string;
  degree: string;
  school: string;
  start: string;
  end: string;
}

export interface Language {
  id: string;
  name: string;
  level: string;
}

export interface CVProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  summary: string;
  experiences: { id: string; title: string; company: string; start: string; end: string; description: string }[];
  education: Education[];
  skills: string[];
  languages: Language[];
  interests: string[];
}

export interface CVData {
  score: number;
  name: string;
  city: string;
  summary: string;
  jobTitle: string;
  contract: string;
  fileName: string;
  fileSize: string;
  profileType: string;
  photoScore: number;
  sectors: string[];
  suggestions: string[];
  strengths: { title: string; text: string }[];
  improvements: { severity: string; section: string; title: string; text: string; before?: string; after?: string; points?: number }[];
  corrections: { severity: string; section: string; title: string; text: string; before?: string; after?: string; points?: number }[];
  profile: CVProfile;
  analyzed: boolean;
  verified: boolean;
}

export interface SearchCriteria {
  job: string;
  city: string;
  zip: string;
  radius: string;
  experience: string;
}

export interface UserSettings {
  newsletter: boolean;
  searchCriteria: SearchCriteria;
}
