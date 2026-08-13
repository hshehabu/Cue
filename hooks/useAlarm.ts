'use client';

import { useRef, useCallback, useEffect } from 'react';
import { ALARM_SOUND_STORAGE_KEY, DEFAULT_ALARM_SOUND_ID } from '@/data/alarmSounds';

type SoundId = 'default' | 'gentle-bell' | 'digital' | 'kitchen-timer' | 'none';

function synthesize(ctx: AudioContext, soundId: SoundId): void {
  if (soundId === 'none') return;
  const now = ctx.currentTime;

  if (soundId === 'default') {
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.45, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    [880, 1318].forEach((freq) => {
      const o = ctx.createOscillator(); o.type = 'sine'; o.frequency.value = freq;
      o.connect(gain); o.start(now); o.stop(now + 0.95);
    });
  } else if (soundId === 'gentle-bell') {
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.4);
    [523, 659].forEach((freq) => {
      const o = ctx.createOscillator(); o.type = 'triangle'; o.frequency.value = freq;
      o.connect(gain); o.start(now); o.stop(now + 1.5);
    });
  } else if (soundId === 'digital') {
    for (let i = 0; i < 3; i++) {
      const t = now + i * 0.18;
      const g = ctx.createGain();
      g.connect(ctx.destination);
      g.gain.setValueAtTime(0.35, t); g.gain.setValueAtTime(0, t + 0.12);
      const o = ctx.createOscillator(); o.type = 'square'; o.frequency.value = 1000;
      o.connect(g); o.start(t); o.stop(t + 0.13);
    }
  } else if (soundId === 'kitchen-timer') {
    const gain = ctx.createGain();
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    const o1 = ctx.createOscillator(); o1.type = 'sawtooth'; o1.frequency.value = 1200;
    o1.connect(gain); o1.start(now); o1.stop(now + 0.7);
    const o2 = ctx.createOscillator(); o2.type = 'sine'; o2.frequency.value = 600;
    o2.connect(gain); o2.start(now); o2.stop(now + 0.7);
  }
}

export function useAlarm() {
  const ctxRef      = useRef<AudioContext | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Eagerly initialize AudioContext on mount (it will be suspended)
  // to avoid initialization lag on first click
  useEffect(() => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
    } catch {
      // Ignore audio errors if not supported
    }
  }, []);

  const getCtx = useCallback((): AudioContext | null => {
    try {
      if (!ctxRef.current) {
        ctxRef.current = new (window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      }
      if (ctxRef.current.state === 'suspended') ctxRef.current.resume();
      return ctxRef.current;
    } catch { return null; }
  }, []);

  const unlock = useCallback(() => { getCtx(); }, [getCtx]);

  const playBeep = useCallback(() => {
    const ctx = getCtx();
    if (!ctx) return;
    const id = (
      (typeof window !== 'undefined' && localStorage.getItem(ALARM_SOUND_STORAGE_KEY)) ||
      DEFAULT_ALARM_SOUND_ID
    ) as SoundId;
    synthesize(ctx, id);
  }, [getCtx]);

  const stopAlarm = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const startAlarm = useCallback(() => {
    stopAlarm();
    playBeep();
    intervalRef.current = setInterval(playBeep, 1800);
  }, [playBeep, stopAlarm]);

  const preview = useCallback((soundId: string) => {
    const ctx = getCtx();
    if (!ctx) return;
    synthesize(ctx, soundId as SoundId);
  }, [getCtx]);

  return { unlock, startAlarm, stopAlarm, preview };
}
