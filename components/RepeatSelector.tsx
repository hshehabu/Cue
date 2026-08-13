'use client';

import { Repeat } from 'lucide-react';
import type { RepeatOption } from '@/types';

interface Props {
  value: RepeatOption;
  onChange: (v: RepeatOption) => void;
  disabled: boolean;
}

export function RepeatSelector({ value, onChange, disabled }: Props) {
  const options: { label: string; val: RepeatOption }[] = [
    { label: 'Off', val: 'off' },
    { label: '2x', val: 2 },
    { label: '3x', val: 3 },
    { label: '5x', val: 5 },
    { label: '∞', val: 'infinite' },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-1.5 text-[13px] font-medium text-[#363635]">
        <Repeat size={14} strokeWidth={2} />
        <span>Repeat</span>
      </div>
      <div className="flex bg-[#F5F5F5] p-[2px] rounded-[6px] border border-[#EBEBEB]">
        {options.map(opt => {
          const active = value === opt.val;
          return (
            <button
              key={opt.label}
              disabled={disabled}
              onClick={() => onChange(opt.val)}
              className={`
                h-[28px] px-3 rounded-[4px] text-[13px] font-medium transition-colors
                ${active
                  ? 'bg-white text-black shadow-sm border border-[#EBEBEB]'
                  : 'text-[#C3C3C2] hover:text-[#363635] border border-transparent'
                }
                ${disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}
              `}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
