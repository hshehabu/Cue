'use client';

import { useState } from 'react';
import type { TimerState, TimerPresetGroup, PresetOption } from '@/types';

function fmtTime(m: number, s: number) { return s === 0 ? `${m} min` : `${m}m ${s}s`; }

export function QuickPresets({ title, groups, timerState, onApplyPreset }: {
  title: string;
  groups: TimerPresetGroup[];
  timerState: TimerState;
  onApplyPreset: (minutes: number, seconds: number) => void;
}) {
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const locked = timerState !== 'idle';

  const handleGroup = (id: string) => {
    if (locked) return;
    setActiveGroupId((prev) => prev === id ? null : id);
  };

  const handleOption = (opt: PresetOption) => {
    if (locked) return;
    onApplyPreset(opt.minutes, opt.seconds);
  };

  const activeGroup: TimerPresetGroup | undefined = groups.find((g) => g.id === activeGroupId);

  return (
    <aside className={`flex flex-col gap-4 ${locked ? 'pointer-events-none' : ''}`} aria-label="Quick food presets">

      {/* Header */}
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-medium text-[#C3C3C2] uppercase tracking-[0.1em]">{title}</span>
        <span
          className="text-[#C3C3C2] hover:text-[#363635] transition-colors cursor-default"
          title="Times are approximate and may vary depending on size, equipment, and preference."
          aria-label="Times are approximate and may vary"
          tabIndex={0}
        >
          <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <circle cx="7" cy="7" r="6.25" stroke="currentColor" strokeWidth="1.25" />
            <rect x="6.25" y="5.75" width="1.5" height="5" rx="0.5" fill="currentColor" />
            <circle cx="7" cy="3.75" r="0.9" fill="currentColor" />
          </svg>
        </span>
      </div>

      {/* Group grid */}
      <div className={`grid grid-cols-2 sm:grid-cols-3 gap-2 transition-opacity duration-150 ${locked ? 'opacity-40' : ''}`} role="list">
        {groups.map((group) => {
          const active = activeGroupId === group.id;
          return (
            <button
              key={group.id}
              role="listitem"
              aria-pressed={active}
              aria-label={`${group.name} presets`}
              onClick={() => handleGroup(group.id)}
              className={`flex flex-col items-center gap-1 py-2.5 px-1.5 border rounded-[5px] text-center transition-colors duration-100
                ${active ? 'bg-black border-black' : 'bg-white border-[#C3C3C2] hover:bg-[#F5F5F5] hover:border-[#363635]'}`}
            >
              <span className="text-[22px] leading-none select-none" aria-hidden="true">{group.icon}</span>
              <span className={`text-[11px] leading-tight ${active ? 'text-white' : 'text-[#363635]'}`}>{group.name}</span>
            </button>
          );
        })}
      </div>

      {/* Options */}
      {activeGroup && (
        <div className="flex flex-col gap-1.5" aria-live="polite">
          <p className="text-[11px] font-medium text-[#C3C3C2] uppercase tracking-[0.08em]">{activeGroup.name}</p>
          {activeGroup.options.map((opt) => (
            <button
              key={opt.label}
              onClick={() => handleOption(opt)}
              aria-label={`${activeGroup.name} — ${opt.label}, ${fmtTime(opt.minutes, opt.seconds)}`}
              className="flex items-center justify-between w-full px-3 py-2 border border-[#C3C3C2] rounded-[4px] bg-white text-[13px] text-[#363635] hover:bg-[#F5F5F5] hover:border-[#363635] hover:text-black active:bg-[#EBEBEB] transition-colors duration-100 text-left"
            >
              <span className="font-normal">{opt.label}</span>
              <span className="text-[12px] text-[#C3C3C2] ml-2 tabular-nums whitespace-nowrap">{fmtTime(opt.minutes, opt.seconds)}</span>
            </button>
          ))}
        </div>
      )}

      <p className="text-[11px] text-[#C3C3C2] font-light leading-relaxed">Times are approximate and may vary.</p>
    </aside>
  );
}
