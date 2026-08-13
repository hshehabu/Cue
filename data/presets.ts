import type { FoodPreset } from '@/types';

/**
 * Quick food presets for the Cooking timer.
 * Edit only this file to add/modify foods or options.
 */
export const FOOD_PRESETS: FoodPreset[] = [
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
