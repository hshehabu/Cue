'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { TimerState } from '@/types';

export function formatTime(totalSecs: number): string {
  const s = Math.floor(totalSecs);
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
}

export interface UseTimerReturn {
  state: TimerState;
  remaining: number;
  totalSeconds: number;
  inputMinutes: number;
  inputSeconds: number;
  setInputMinutes: (v: number) => void;
  setInputSeconds: (v: number) => void;
  applyDuration: (minutes: number, seconds: number) => void;
  addTime: (minutes: number) => void;
  start: () => void;
  pause: () => void;
  resume: () => void;
  reset: () => void;
}

export function useTimer(onFinished?: () => void): UseTimerReturn {
  const [state, setState]               = useState<TimerState>('idle');
  const [remaining, setRemaining]       = useState(15 * 60);
  const [totalSeconds, setTotalSeconds] = useState(15 * 60);
  const [inputMinutes, setInputMinutes] = useState(15);
  const [inputSeconds, setInputSeconds] = useState(0);

  const startTsRef    = useRef<number>(0);
  const remainRefAtResume = useRef<number>(15 * 60);
  const intervalRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const stateRef      = useRef<TimerState>('idle');
  const onFinishedRef = useRef(onFinished);

  useEffect(() => { onFinishedRef.current = onFinished; }, [onFinished]);
  useEffect(() => { stateRef.current = state; }, [state]);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const tick = useCallback(() => {
    const elapsed = (performance.now() - startTsRef.current) / 1000;
    const r = Math.max(0, remainRefAtResume.current - elapsed);
    setRemaining(r);
    if (r <= 0) {
      stopInterval();
      setRemaining(0);
      setState('finished');
      stateRef.current = 'finished';
      onFinishedRef.current?.();
    }
  }, [stopInterval]);

  const startInterval = useCallback((fromRemaining: number) => {
    stopInterval();
    startTsRef.current = performance.now();
    remainRefAtResume.current = fromRemaining;
    intervalRef.current = setInterval(tick, 250);
  }, [stopInterval, tick]);

  const start = useCallback(() => {
    const total = inputMinutes * 60 + inputSeconds;
    if (total === 0) return;
    setTotalSeconds(total);
    setRemaining(total);
    setState('running');
    startInterval(total);
  }, [inputMinutes, inputSeconds, startInterval]);

  const pause = useCallback(() => {
    if (stateRef.current !== 'running') return;
    const elapsed = (performance.now() - startTsRef.current) / 1000;
    const r = Math.max(0, remainRefAtResume.current - elapsed);
    stopInterval();
    setRemaining(r);
    remainRefAtResume.current = r;
    setState('paused');
  }, [stopInterval]);

  const resume = useCallback(() => {
    if (stateRef.current !== 'paused') return;
    setState('running');
    startInterval(remainRefAtResume.current);
  }, [startInterval]);

  const reset = useCallback(() => {
    stopInterval();
    const total = inputMinutes * 60 + inputSeconds;
    setTotalSeconds(total);
    setRemaining(total);
    setState('idle');
  }, [stopInterval, inputMinutes, inputSeconds]);

  const applyDuration = useCallback((minutes: number, seconds: number) => {
    if (stateRef.current !== 'idle') return;
    setInputMinutes(minutes);
    setInputSeconds(seconds);
    const total = minutes * 60 + seconds;
    setTotalSeconds(total);
    setRemaining(total);
  }, []);

  const addTime = useCallback((minutes: number) => {
    const secondsToAdd = minutes * 60;
    if (stateRef.current === 'idle') {
      const newMins = Math.min(99, inputMinutes + minutes);
      setInputMinutes(newMins);
      const total = newMins * 60 + inputSeconds;
      setTotalSeconds(total);
      setRemaining(total);
    } else {
      remainRefAtResume.current += secondsToAdd;
      setRemaining((prev) => prev + secondsToAdd);
    }
  }, [inputMinutes, inputSeconds]);

  useEffect(() => () => stopInterval(), [stopInterval]);

  return { state, remaining, totalSeconds, inputMinutes, inputSeconds, setInputMinutes, setInputSeconds, applyDuration, addTime, start, pause, resume, reset };
}
