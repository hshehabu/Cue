import type { AlarmSound } from '@/types';

export const ALARM_SOUNDS: AlarmSound[] = [
  { id: 'default',       label: 'Default',       file: null },
  { id: 'gentle-bell',   label: 'Gentle Bell',   file: null },
  { id: 'digital',       label: 'Digital',       file: null },
  { id: 'kitchen-timer', label: 'Kitchen Timer', file: null },
  { id: 'none',          label: 'None',          file: null },
];

export const DEFAULT_ALARM_SOUND_ID = 'default';
export const ALARM_SOUND_STORAGE_KEY = 'cue-alarm-sound';
