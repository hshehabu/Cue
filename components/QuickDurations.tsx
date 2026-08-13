'use client';

import type { TimerState } from '@/types';

interface Props {
  state: TimerState;
  onSetDuration: (minutes: number, seconds: number) => void;
  onAddTime: (minutes: number) => void;
}

export function QuickDurations({ state, onSetDuration, onAddTime }: Props) {
  const isRunning = state === 'running';

  const fixedDurations = [1, 5, 10, 15, 30];

  return (
    <div className="flex flex-col gap-3" aria-label="Quick timer durations">
      {/* Fixed Presets Row */}
      <div className="flex flex-wrap items-center gap-2">
        {fixedDurations.map((m) => (
          <button
            key={m}
            disabled={isRunning}
            onClick={() => onSetDuration(m, 0)}
            className={`
              h-[36px] px-3.5 rounded-[4px] border text-[13px] font-medium transition-colors
              ${isRunning 
                ? 'bg-[#F5F5F5] border-[#EBEBEB] text-[#C3C3C2] cursor-not-allowed' 
                : 'bg-white border-[#C3C3C2] text-[#363635] hover:bg-[#F5F5F5] hover:border-[#363635] hover:text-black active:bg-[#EBEBEB] cursor-pointer'
              }
            `}
          >
            {m}m
          </button>
        ))}
      </div>

      {/* Additive Presets Row */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onAddTime(1)}
          className="h-[36px] px-3.5 rounded-[4px] border border-[#C3C3C2] bg-white text-[#363635] text-[13px] font-medium hover:bg-[#F5F5F5] hover:border-[#363635] hover:text-black active:bg-[#EBEBEB] transition-colors cursor-pointer"
        >
          +1 min
        </button>
        <button
          onClick={() => onAddTime(5)}
          className="h-[36px] px-3.5 rounded-[4px] border border-[#C3C3C2] bg-white text-[#363635] text-[13px] font-medium hover:bg-[#F5F5F5] hover:border-[#363635] hover:text-black active:bg-[#EBEBEB] transition-colors cursor-pointer"
        >
          +5 min
        </button>
      </div>
    </div>
  );
}
