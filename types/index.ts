// types/index.ts — Shared TypeScript types for Cue

export interface TimerType {
  id: string;
  name: string;
  description: string;
  icon: string;
  route: string;
}

export interface PresetOption {
  label: string;
  minutes: number;
  seconds: number;
}

export interface FoodPreset {
  id: string;
  icon: string;
  name: string;
  options: PresetOption[];
}

export interface AlarmSound {
  id: string;
  label: string;
  file: string | null;
}

export type TimerState = 'idle' | 'running' | 'paused' | 'finished';

export interface CustomPreset {
  id: string;
  name: string;
  duration: number; // total seconds
  icon?: string;
  createdAt: number;
}
