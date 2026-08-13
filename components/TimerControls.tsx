'use client';

import type { TimerState } from '@/types';

function clamp(v: number, min: number, max: number) { return Math.max(min, Math.min(max, v)); }
function pad(n: number) { return String(Math.floor(n)).padStart(2, '0'); }

interface Props {
  state: TimerState;
  inputMinutes: number;
  inputSeconds: number;
  onMinutesChange: (v: number) => void;
  onSecondsChange: (v: number) => void;
  onStart: () => void;
  onPause: () => void;
  onResume: () => void;
  onReset: () => void;
  onStopAlarm: () => void;
  onNewTimer: () => void;
}

const stepperBtn = "w-9 h-11 bg-[#F5F5F5] text-[#363635] text-lg flex items-center justify-center hover:bg-[#EBEBEB] hover:text-black active:bg-[#C3C3C2] transition-colors select-none cursor-pointer";
const numberInput = "w-14 h-11 text-center text-[20px] font-normal text-black bg-white border-x border-[#C3C3C2] outline-none focus:bg-[#F5F5F5] tabular-nums [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none";

function Stepper({ label, value, onDecrement, onIncrement, onChange, min, max }: {
  label: string; value: number;
  onDecrement: () => void; onIncrement: () => void;
  onChange: (v: number) => void; min: number; max: number;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="text-[11px] font-medium text-[#C3C3C2] uppercase tracking-[0.1em]">{label}</span>
      <div className="flex items-center border border-[#C3C3C2] rounded-[4px] overflow-hidden bg-white">
        <button onClick={onDecrement} aria-label={`Decrease ${label}`} className={stepperBtn}>−</button>
        <input
          type="number" value={pad(value)} min={min} max={max}
          onChange={(e) => onChange(clamp(parseInt(e.target.value) || 0, min, max))}
          onKeyDown={(e) => {
            if (e.key === 'ArrowUp')   { e.preventDefault(); onIncrement(); }
            if (e.key === 'ArrowDown') { e.preventDefault(); onDecrement(); }
          }}
          aria-label={label} className={numberInput}
        />
        <button onClick={onIncrement} aria-label={`Increase ${label}`} className={stepperBtn}>+</button>
      </div>
    </div>
  );
}

export function TimerControls({ state, inputMinutes, inputSeconds, onMinutesChange, onSecondsChange, onStart, onPause, onResume, onReset, onStopAlarm, onNewTimer }: Props) {
  const isIdle     = state === 'idle';
  const isRunning  = state === 'running';
  const isPaused   = state === 'paused';
  const isFinished = state === 'finished';

  const stepMin = (delta: number) => onMinutesChange(clamp(inputMinutes + delta, 0, 99));
  const stepSec = (delta: number) => {
    let s = inputSeconds + delta, m = inputMinutes;
    if (s > 59) { s = 0; m = clamp(m + 1, 0, 99); onMinutesChange(m); }
    else if (s < 0) { s = 59; m = clamp(m - 1, 0, 99); onMinutesChange(m); }
    onSecondsChange(clamp(s, 0, 59));
  };

  return (
    <div className="flex flex-col gap-8">
      {isIdle && (
        <div className="flex items-end gap-3">
          <Stepper label="Min" value={inputMinutes} onDecrement={() => stepMin(-1)} onIncrement={() => stepMin(1)} onChange={onMinutesChange} min={0} max={99} />
          <span className="text-[28px] font-light text-[#C3C3C2] pb-1.5 leading-none tracking-[-0.02em]">:</span>
          <Stepper label="Sec" value={inputSeconds} onDecrement={() => stepSec(-1)} onIncrement={() => stepSec(1)} onChange={onSecondsChange} min={0} max={59} />
        </div>
      )}

      <div className="flex items-center gap-2.5 flex-wrap">
        {isIdle && (
          <button onClick={onStart} className="h-[42px] px-[22px] rounded-[4px] bg-black text-white text-[14px] font-medium hover:bg-[#363635] active:bg-[#1a1a19] transition-colors">
            Start
          </button>
        )}
        {(isRunning || isPaused) && (
          <>
            <button onClick={isRunning ? onPause : onResume} className="h-[42px] px-[22px] rounded-[4px] bg-[#EBEBEB] text-black border border-[#C3C3C2] text-[14px] font-medium hover:bg-[#C3C3C2] transition-colors">
              {isRunning ? 'Pause' : 'Resume'}
            </button>
            <button onClick={onReset} className="h-[42px] px-[22px] rounded-[4px] bg-transparent text-[#363635] border border-[#C3C3C2] text-[14px] font-medium hover:bg-[#F5F5F5] hover:text-black transition-colors">
              Reset
            </button>
          </>
        )}
        {isFinished && (
          <>
            <button onClick={onStopAlarm} className="h-[42px] px-[22px] rounded-[4px] bg-black text-white text-[14px] font-medium hover:bg-[#363635] transition-colors">
              Stop Alarm
            </button>
            <button onClick={onNewTimer} className="h-[42px] px-[22px] rounded-[4px] bg-transparent text-[#363635] border border-[#C3C3C2] text-[14px] font-medium hover:bg-[#F5F5F5] hover:text-black transition-colors">
              Start Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
