export interface StepData {
  steps: number;
  goal: number;
  calories: number;
  distance: number; // in km
  time: number; // in minutes
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  date?: string;
}

export interface UserProfile {
  name: string;
  streak: number;
  totalSteps: number;
  level: number;
}
