'use client';

import { formatTime } from '@/hooks/useTimer';
import type { TimerState, RepeatOption } from '@/types';

export function Timer({ remaining, state, repeatConfig, currentCycle }: { remaining: number; state: TimerState; repeatConfig: RepeatOption; currentCycle: number }) {
  return (
    <div className="w-full">
      <div
        className={`font-light tracking-[-0.04em] leading-none tabular-nums transition-opacity duration-200
          ${state === 'paused'   ? 'opacity-45' : ''}
          ${state === 'finished' ? 'animate-pulse-finished' : ''}
        `}
        style={{ fontSize: 'clamp(72px, 18vw, 112px)' }}
        aria-live="polite"
        aria-label={`Timer: ${formatTime(remaining)}`}
      >
        {formatTime(remaining)}
      </div>
      <div className="mt-2.5 text-[13px] font-normal text-[#C3C3C2] uppercase tracking-[0.05em] min-h-[18px] flex items-center">
        <span>
          {state === 'running'  && 'Running'}
          {state === 'paused'   && 'Paused'}
          {state === 'finished' && <span className="text-black font-medium normal-case">Time&apos;s up!</span>}
        </span>
        {repeatConfig !== 'off' && state !== 'idle' && (
          <span className="ml-3 border-l border-[#EBEBEB] pl-3 normal-case tracking-normal text-[#363635]">
            {repeatConfig === 'infinite' ? `Repeating (Cycle ${currentCycle})` : `Cycle ${currentCycle} of ${repeatConfig}`}
          </span>
        )}
      </div>
    </div>
  );
}
