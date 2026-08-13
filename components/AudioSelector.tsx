'use client';

import { Play } from 'lucide-react';
import { ALARM_SOUNDS } from '@/data/alarmSounds';
import { useAlarm } from '@/hooks/useAlarm';

export function AudioSelector({ selectedId, onSelect }: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  const { preview } = useAlarm();

  return (
    <div className="flex flex-col gap-1.5" role="radiogroup" aria-label="Alarm sound selection">
      {ALARM_SOUNDS.map((sound) => {
        const selected = sound.id === selectedId;
        return (
          <div
            key={sound.id}
            role="radio"
            aria-checked={selected}
            tabIndex={0}
            onClick={() => onSelect(sound.id)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(sound.id); } }}
            className={`flex items-center justify-between px-4 py-3 border rounded-[4px] cursor-pointer transition-colors duration-100
              ${selected ? 'border-black bg-[#F5F5F5]' : 'border-[#C3C3C2] bg-white hover:bg-[#F5F5F5] hover:border-[#363635]'}`}
          >
            <div className="flex items-center gap-3">
              <span className={`w-[14px] h-[14px] rounded-full border flex-shrink-0 ${selected ? 'border-black bg-black' : 'border-[#C3C3C2]'}`} aria-hidden="true" />
              <span className={`text-[14px] ${selected ? 'font-medium text-black' : 'font-normal text-[#363635]'}`}>{sound.label}</span>
            </div>
            {sound.id !== 'none' && (
              <button
                aria-label={`Preview ${sound.label}`}
                onClick={(e) => { e.stopPropagation(); preview(sound.id); }}
                className="p-1.5 rounded-[3px] text-[#C3C3C2] hover:text-[#363635] hover:bg-[#EBEBEB] transition-colors duration-100"
              >
                <Play size={13} strokeWidth={2} aria-hidden="true" />
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
