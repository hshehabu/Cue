import type { TimerPresetGroup } from '@/types';

/**
 * Quick presets for the Cooking timer.
 */
export const COOKING_PRESETS: TimerPresetGroup[] = [
  {
    id: 'egg', icon: '🍳', name: 'Egg',
    options: [
      { label: 'Soft',   minutes: 6,  seconds: 0 },
      { label: 'Medium', minutes: 8,  seconds: 0 },
      { label: 'Hard',   minutes: 12, seconds: 0 },
    ],
  },
  {
    id: 'potato', icon: '🥔', name: 'Potato',
    options: [
      { label: 'Baby',   minutes: 15, seconds: 0 },
      { label: 'Wedges', minutes: 30, seconds: 0 },
      { label: 'Whole',  minutes: 45, seconds: 0 },
    ],
  },
  {
    id: 'pasta', icon: '🍝', name: 'Pasta',
    options: [
      { label: 'Al dente', minutes: 8,  seconds: 0 },
      { label: 'Regular',  minutes: 11, seconds: 0 },
      { label: 'Soft',     minutes: 14, seconds: 0 },
    ],
  },
  {
    id: 'rice', icon: '🍚', name: 'Rice',
    options: [
      { label: 'White',   minutes: 18, seconds: 0 },
      { label: 'Basmati', minutes: 12, seconds: 0 },
      { label: 'Brown',   minutes: 40, seconds: 0 },
    ],
  },
  {
    id: 'corn', icon: '🌽', name: 'Corn',
    options: [
      { label: 'Tender',   minutes: 4,  seconds: 0 },
      { label: 'Standard', minutes: 7,  seconds: 0 },
      { label: 'Full',     minutes: 10, seconds: 0 },
    ],
  },
  {
    id: 'vegetables', icon: '🥦', name: 'Veggies',
    options: [
      { label: 'Crisp',  minutes: 3,  seconds: 0 },
      { label: 'Tender', minutes: 6,  seconds: 0 },
      { label: 'Soft',   minutes: 10, seconds: 0 },
    ],
  },
];

/**
 * Quick presets for the Laundry timer.
 */
export const LAUNDRY_PRESETS: TimerPresetGroup[] = [
  {
    id: 'washing', icon: '🧺', name: 'Washing',
    options: [
      { label: 'Quick Wash', minutes: 15, seconds: 0 },
      { label: 'Machine', minutes: 30, seconds: 0 },
      { label: 'Normal Wash', minutes: 45, seconds: 0 },
      { label: 'Heavy Wash', minutes: 60, seconds: 0 },
    ],
  },
  {
    id: 'dryer', icon: '🌬️', name: 'Dryer',
    options: [
      { label: 'Standard', minutes: 45, seconds: 0 },
    ]
  }
];

/**
 * Quick presets for the Workout timer.
 */
export const WORKOUT_PRESETS: TimerPresetGroup[] = [
  {
    id: 'stretch', icon: '🧘', name: 'Stretch',
    options: [
      { label: 'Warm up', minutes: 5, seconds: 0 },
      { label: 'Cool down', minutes: 10, seconds: 0 },
    ],
  },
  {
    id: 'cardio', icon: '🏃', name: 'Cardio',
    options: [
      { label: 'HIIT', minutes: 15, seconds: 0 },
      { label: 'Run', minutes: 30, seconds: 0 },
      { label: 'Long Run', minutes: 60, seconds: 0 },
    ]
  },
  {
    id: 'strength', icon: '💪', name: 'Strength',
    options: [
      { label: 'Core', minutes: 10, seconds: 0 },
      { label: 'Quick', minutes: 20, seconds: 0 },
      { label: 'Full Body', minutes: 45, seconds: 0 },
    ]
  }
];
