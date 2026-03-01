import type { LearningOutcome, CASBranch } from './types';

export const LEARNING_OUTCOMES: Record<LearningOutcome, { key: string; shortCode: string }> = {
  1: {
    key: 'LO1',
    shortCode: 'LO1'
  },
  2: {
    key: 'LO2',
    shortCode: 'LO2'
  },
  3: {
    key: 'LO3',
    shortCode: 'LO3'
  },
  4: {
    key: 'LO4',
    shortCode: 'LO4'
  },
  5: {
    key: 'LO5',
    shortCode: 'LO5'
  },
  6: {
    key: 'LO6',
    shortCode: 'LO6'
  },
  7: {
    key: 'LO7',
    shortCode: 'LO7'
  }
} as const;

export const CAS_BRANCHES: Record<CASBranch, { key: string; color: string; bgColor: string; textColor: string }> = {
  C: {
    key: 'creativity',
    color: 'purple',
    bgColor: 'bg-purple-100 dark:bg-purple-900',
    textColor: 'text-purple-700 dark:text-purple-300'
  },
  A: {
    key: 'activity',
    color: 'green',
    bgColor: 'bg-green-100 dark:bg-green-900',
    textColor: 'text-green-700 dark:text-green-300'
  },
  S: {
    key: 'service',
    color: 'blue',
    bgColor: 'bg-blue-100 dark:bg-blue-900',
    textColor: 'text-blue-700 dark:text-blue-300'
  }
} as const;

export const CAS_STAGES = [
  'investigation',
  'preparation',
  'action',
  'demonstration',
  'reflection'
] as const;

export type CASStageKey = typeof CAS_STAGES[number];
