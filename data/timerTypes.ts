import type { TimerType } from '@/types';
import { COOKING_PRESETS, LAUNDRY_PRESETS } from './presets';

/**
 * Registry of all timer types.
 * Add new timer types here — no UI changes required.
 */
export const TIMER_TYPES: TimerType[] = [
  {
    id: 'cooking',
    name: 'Cooking',
    description: 'Set a timer for your food.',
    icon: 'ChefHat',
    route: '/cook',
    defaultMinutes: 15,
    presetsTitle: 'Quick Presets',
    presets: COOKING_PRESETS,
  },
  {
    id: 'laundry',
    name: 'Laundry',
    description: 'Set a reminder for your laundry.',
    icon: 'WashingMachine',
    route: '/laundry',
    defaultMinutes: 30,
    presetsTitle: 'Laundry Presets',
    presets: LAUNDRY_PRESETS,
  }
];
