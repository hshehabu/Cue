'use client';

import { useState } from 'react';
import { Coffee, Book, Dumbbell, Home, Utensils, Bell, Clock, Plus, MoreVertical, X } from 'lucide-react';
import { useCustomPresets } from '@/hooks/useCustomPresets';
import type { TimerState, CustomPreset } from '@/types';
import { formatTime } from '@/hooks/useTimer';

const ICONS = { Clock, Coffee, Book, Dumbbell, Home, Utensils, Bell };
type IconName = keyof typeof ICONS;

interface Props {
  state: TimerState;
  currentMinutes: number;
  currentSeconds: number;
  onApplyPreset: (minutes: number, seconds: number) => void;
}

export function CustomPresets({ state, currentMinutes, currentSeconds, onApplyPreset }: Props) {
  const { presets, isLoaded, addPreset, updatePreset, deletePreset } = useCustomPresets();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState<IconName>('Clock');
  
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const isRunning = state === 'running';

  const openCreate = () => {
    setEditingId(null);
    setName('');
    setMinutes(currentMinutes);
    setSeconds(currentSeconds);
    setSelectedIcon('Clock');
    setIsDialogOpen(true);
  };

  const openEdit = (p: CustomPreset) => {
    setEditingId(p.id);
    setName(p.name);
    setMinutes(Math.floor(p.duration / 60));
    setSeconds(p.duration % 60);
    setSelectedIcon((p.icon as IconName) || 'Clock');
    setMenuOpenId(null);
    setIsDialogOpen(true);
  };

  const handleSave = () => {
    const duration = minutes * 60 + seconds;
    if (duration === 0) return;
    const finalName = name.trim() || 'Timer';
    
    if (editingId) {
      updatePreset(editingId, { name: finalName, duration, icon: selectedIcon });
    } else {
      addPreset({ name: finalName, duration, icon: selectedIcon });
    }
    setIsDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deletePreset(id);
    setMenuOpenId(null);
    setDeleteConfirmId(null);
  };

  if (!isLoaded) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[14px] font-medium text-black">My Presets</h2>
        <button
          onClick={openCreate}
          disabled={isRunning}
          className={`
            inline-flex items-center gap-1.5 text-[13px] transition-colors
            ${isRunning ? 'text-[#C3C3C2] cursor-not-allowed' : 'text-[#363635] hover:text-black cursor-pointer'}
          `}
        >
          <Plus size={14} strokeWidth={2} />
          <span>Save preset</span>
        </button>
      </div>

      {presets.length === 0 ? (
        <div className="border border-[#EBEBEB] bg-[#F5F5F5] rounded-[6px] p-5 text-center flex flex-col items-center justify-center gap-2">
          <p className="text-[13px] text-[#363635]">Save timers you use often.</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {presets.map(p => {
            const Icon = ICONS[(p.icon as IconName) || 'Clock'] || Clock;
            const isMenuOpen = menuOpenId === p.id;
            return (
              <div key={p.id} className={`relative flex items-stretch border rounded-[4px] transition-colors ${isRunning ? 'border-[#EBEBEB] bg-[#F5F5F5]' : 'border-[#C3C3C2] bg-white'}`}>
                <button
                  disabled={isRunning}
                  onClick={() => onApplyPreset(Math.floor(p.duration / 60), p.duration % 60)}
                  className={`
                    h-[42px] pl-3 pr-2 flex items-center gap-2 rounded-l-[3px] transition-colors
                    ${isRunning
                      ? 'text-[#C3C3C2] cursor-not-allowed'
                      : 'hover:bg-[#F5F5F5] text-[#363635] hover:text-black cursor-pointer'
                    }
                  `}
                >
                  <Icon size={14} strokeWidth={2} />
                  <span className="text-[13px] font-medium truncate max-w-[120px]">{p.name}</span>
                  <span className="text-[12px] text-[#C3C3C2]">{formatTime(p.duration)}</span>
                </button>
                <div className={`w-[1px] my-2 ${isRunning ? 'bg-[#EBEBEB]' : 'bg-[#EBEBEB]'}`} />
                <div className="relative flex">
                  <button
                    disabled={isRunning}
                    onClick={() => setMenuOpenId(isMenuOpen ? null : p.id)}
                    className={`
                      w-[34px] flex items-center justify-center rounded-r-[3px] transition-colors
                      ${isRunning
                        ? 'text-[#C3C3C2] cursor-not-allowed'
                        : 'hover:bg-[#F5F5F5] text-[#C3C3C2] hover:text-black cursor-pointer'
                      }
                    `}
                  >
                    <MoreVertical size={14} strokeWidth={2} />
                  </button>
                  {isMenuOpen && (
                    <>
                      <div className="fixed inset-0 z-10" onClick={() => setMenuOpenId(null)} />
                      <div className="absolute right-0 top-[100%] mt-1 w-32 bg-white border border-[#C3C3C2] rounded-[4px] shadow-sm z-20 py-1 flex flex-col">
                        <button onClick={() => openEdit(p)} className="text-left px-3 py-1.5 text-[13px] text-[#363635] hover:bg-[#F5F5F5] hover:text-black cursor-pointer">Edit</button>
                        <button onClick={() => setDeleteConfirmId(p.id)} className="text-left px-3 py-1.5 text-[13px] text-red-600 hover:bg-[#F5F5F5] cursor-pointer">Delete</button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Save Dialog */}
      {isDialogOpen && (
        <div className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#C3C3C2] rounded-[6px] shadow-sm w-full max-w-sm p-6 flex flex-col gap-6" role="dialog" aria-modal="true">
            <div className="flex items-center justify-between">
              <h3 className="text-[16px] font-medium text-black">{editingId ? 'Edit preset' : 'Save as preset'}</h3>
              <button onClick={() => setIsDialogOpen(false)} className="text-[#C3C3C2] hover:text-black transition-colors cursor-pointer"><X size={18} /></button>
            </div>
            
            <div className="flex flex-col gap-4">
              <label className="flex flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#363635]">Name</span>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Morning coffee"
                  className="h-10 px-3 border border-[#C3C3C2] rounded-[4px] text-[14px] outline-none focus:border-black"
                  autoFocus
                />
              </label>

              <div className="flex items-center gap-3">
                <label className="flex flex-col gap-1.5 flex-1">
                  <span className="text-[12px] font-medium text-[#363635]">Min</span>
                  <input type="number" min={0} max={99} value={minutes} onChange={e => setMinutes(Math.max(0, parseInt(e.target.value)||0))} className="h-10 px-3 border border-[#C3C3C2] rounded-[4px] text-[14px] tabular-nums outline-none focus:border-black" />
                </label>
                <span className="text-[#C3C3C2] pt-6">:</span>
                <label className="flex flex-col gap-1.5 flex-1">
                  <span className="text-[12px] font-medium text-[#363635]">Sec</span>
                  <input type="number" min={0} max={59} value={seconds} onChange={e => setSeconds(Math.max(0, parseInt(e.target.value)||0))} className="h-10 px-3 border border-[#C3C3C2] rounded-[4px] text-[14px] tabular-nums outline-none focus:border-black" />
                </label>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="text-[12px] font-medium text-[#363635]">Icon</span>
                <div className="flex flex-wrap gap-2">
                  {(Object.keys(ICONS) as IconName[]).map(key => {
                    const Icon = ICONS[key];
                    const isSel = selectedIcon === key;
                    return (
                      <button
                        key={key}
                        onClick={() => setSelectedIcon(key)}
                        className={`h-9 w-9 flex items-center justify-center rounded-[4px] border cursor-pointer transition-colors
                          ${isSel ? 'border-black bg-[#F5F5F5] text-black' : 'border-[#EBEBEB] text-[#C3C3C2] hover:border-[#C3C3C2] hover:text-[#363635]'}
                        `}
                      >
                        <Icon size={16} strokeWidth={isSel ? 2 : 1.5} />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-2">
              <button onClick={() => setIsDialogOpen(false)} className="h-10 px-4 rounded-[4px] border border-[#C3C3C2] text-[#363635] text-[13px] font-medium hover:bg-[#F5F5F5] cursor-pointer">Cancel</button>
              <button onClick={handleSave} className="h-10 px-4 rounded-[4px] bg-black text-white text-[13px] font-medium hover:bg-[#363635] cursor-pointer">Save</button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-white/90 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-[#C3C3C2] rounded-[6px] shadow-sm w-full max-w-xs p-6 flex flex-col gap-6" role="dialog" aria-modal="true">
            <div className="flex flex-col gap-2">
              <h3 className="text-[16px] font-medium text-black">Delete preset?</h3>
              <p className="text-[13px] text-[#363635]">Are you sure you want to delete this preset?</p>
            </div>
            <div className="flex justify-end gap-2">
              <button onClick={() => setDeleteConfirmId(null)} className="h-10 px-4 rounded-[4px] border border-[#C3C3C2] text-[#363635] text-[13px] font-medium hover:bg-[#F5F5F5] cursor-pointer">Cancel</button>
              <button onClick={() => handleDelete(deleteConfirmId)} className="h-10 px-4 rounded-[4px] bg-red-600 text-white text-[13px] font-medium hover:bg-red-700 cursor-pointer">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
