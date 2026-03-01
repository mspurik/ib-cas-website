export type CASBranch = 'C' | 'A' | 'S';

export type LearningOutcome = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type Locale = 'en' | 'es';

export type ExperienceType = 'punctual' | 'ongoing'; // Puntual o Seguimiento

export interface CASStage {
  title: string;
  content: string;
  images?: string[]; // Paths to images
}

export interface CASExperience {
  id: string;
  slug: string;
  title: string;
  type: ExperienceType; // Puntual o Seguimiento
  branches: CASBranch[];
  contactPerson?: {
    name: string;
    role?: string;
    email?: string;
  };
  personalObjective: string;
  personalChallenge?: string;
  learningOutcomes: LearningOutcome[];
  stages: {
    investigation: CASStage;
    preparation: CASStage;
    action: CASStage;
    demonstration: CASStage;
    reflection: CASStage;
  };
  featured?: boolean; // For homepage highlights
  date?: string; // ISO date string
  coverImage?: string; // Main image for card
  videoUrl?: string; // YouTube URL
}

export interface AboutContent {
  name: string;
  title: string;
  bio: string;
  school: string;
  graduationYear: number;
  profileImage?: string;
  socialLinks?: {
    email?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface SiteMetadata {
  title: string;
  description: string;
  author: string;
  siteUrl: string;
}

// CAS Project
export interface CASProject {
  id: string;
  slug: string;
  title: string;
  branches: CASBranch[];
  description: string;
  duration: string; // e.g., "3 months", "September 2024 - January 2025"
  learningOutcomes: LearningOutcome[];
  stages: {
    investigation: CASStage;
    preparation: CASStage;
    action: CASStage;
    demonstration: CASStage;
    reflection: CASStage;
  };
  collaborators?: string[];
  date?: string;
  coverImage?: string;
  featured?: boolean;
}

// SWOT Analysis (DAFO)
export interface SWOT {
  strengths: string[]; // Fortalezas
  weaknesses: string[]; // Debilidades
  opportunities: string[]; // Oportunidades
  threats: string[]; // Amenazas
}

// Interview Summary
export interface Interview {
  id: string;
  number: 1 | 2 | 3; // Interview 1, 2, or 3
  date: string;
  interviewer?: string;
  format: 'written' | 'audio' | 'video' | 'poem' | 'song' | 'drawing' | 'other';
  content: string;
  reflection: string;
  mediaUrl?: string; // For audio, video, or image
}

// Final Reflection
export interface FinalReflection {
  date: string;
  content: string;
  keyLearnings: string[];
  futureGoals: string[];
}

// Organization Table Entry
export interface OrganizationEntry {
  id: string;
  title: string;
  type: 'experience' | 'project';
  branches: CASBranch[];
  learningOutcomes: LearningOutcome[];
  startDate?: string;
  endDate?: string;
  status: 'planned' | 'in-progress' | 'completed';
}
