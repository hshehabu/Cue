import type { TimerType } from '@/types';

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
  },
  // Future types (not yet implemented):
  // { id: 'study',      name: 'Study',      description: 'Focus sessions and breaks.',  icon: 'BookOpen',  route: '/study'      },
  // { id: 'workout',    name: 'Workout',    description: 'Intervals and rest timers.',  icon: 'Dumbbell',  route: '/workout'    },
  // { id: 'meditation', name: 'Meditation', description: 'Quiet your mind.',            icon: 'Wind',      route: '/meditation' },
];
