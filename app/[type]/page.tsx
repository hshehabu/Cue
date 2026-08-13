'use client';

import { ArrowLeft } from 'lucide-react';
import { useCallback, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { useTimer } from '@/hooks/useTimer';
import { useAlarm } from '@/hooks/useAlarm';
import { Timer } from '@/components/Timer';
import { TimerControls } from '@/components/TimerControls';
import { QuickDurations } from '@/components/QuickDurations';
import { RepeatSelector } from '@/components/RepeatSelector';
import { CustomPresets } from '@/components/CustomPresets';
import { QuickPresets } from '@/components/QuickPresets';
import { TIMER_TYPES } from '@/data/timerTypes';

export default function UniversalTimerPage({ params }: { params: Promise<{ type: string }> }) {
  const resolvedParams = use(params);
  const typeParam = resolvedParams.type;
  
  const timerConfig = TIMER_TYPES.find(t => t.route === `/${typeParam}`);
  
  const { startAlarm, stopAlarm, unlock } = useAlarm();
  const onFinished = useCallback(() => { startAlarm(); }, [startAlarm]);

  const defaultMinutes = timerConfig?.defaultMinutes || 15;
  const { state, remaining, inputMinutes, inputSeconds, setInputMinutes, setInputSeconds, applyDuration, addTime, start, pause, resume, reset, repeatConfig, setRepeatConfig, currentCycle, advanceCycle } = useTimer(defaultMinutes, onFinished);

  const handleStart    = () => { unlock(); start(); };
  const handleReset    = () => { stopAlarm(); reset(); };
  const handleNewTimer = () => { stopAlarm(); reset(); };
  
  const handleStop = () => { 
    stopAlarm();
    if (state === 'finished') {
      if (repeatConfig === 'infinite' || (typeof repeatConfig === 'number' && currentCycle < repeatConfig)) {
        advanceCycle();
        start();
      }
    }
  };

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (state === 'finished') {
      const isNotLastCycle = repeatConfig === 'infinite' || (typeof repeatConfig === 'number' && currentCycle < repeatConfig);
      if (isNotLastCycle) {
        timeoutId = setTimeout(() => {
          stopAlarm();
          advanceCycle();
          start();
        }, 10000);
      }
    }
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [state, repeatConfig, currentCycle, stopAlarm, advanceCycle, start]);

  if (!timerConfig) {
    return notFound();
  }

  return (
    <main className="flex-1 flex flex-col px-6 md:px-8 py-8 md:py-12">
      <div className="w-full max-w-5xl mx-auto flex flex-col gap-8">

        {/* Back */}
        <nav>
          <button onClick={() => window.history.back()} className="inline-flex items-center gap-1.5 text-[13px] text-[#C3C3C2] hover:text-[#363635] transition-colors bg-transparent border-none p-0 cursor-pointer">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>Timers</span>
          </button>
        </nav>

        <p className="text-[14px] text-[#C3C3C2] font-light">
          {timerConfig.description}
        </p>

        {/* Two-column layout */}
        <div className="flex flex-col md:flex-row md:items-start gap-10 md:gap-16">
          {/* Timer */}
          <div className="flex flex-col gap-8 flex-1 min-w-0">
            <Timer remaining={remaining} state={state} repeatConfig={repeatConfig} currentCycle={currentCycle} />
            <QuickDurations state={state} onSetDuration={applyDuration} onAddTime={addTime} />
            <div className="pt-2">
              <RepeatSelector value={repeatConfig} onChange={setRepeatConfig} disabled={state === 'running'} />
            </div>
            <TimerControls
              state={state}
              inputMinutes={inputMinutes}
              inputSeconds={inputSeconds}
              onMinutesChange={setInputMinutes}
              onSecondsChange={setInputSeconds}
              onStart={handleStart}
              onPause={pause}
              onResume={resume}
              onReset={handleReset}
              onStopAlarm={handleStop}
              onNewTimer={handleNewTimer}
            />
          </div>
          {/* Presets */}
          <div className="flex flex-col gap-8 flex-shrink-0 md:w-[240px] w-full">
            <QuickPresets title={timerConfig.presetsTitle} groups={timerConfig.presets} timerState={state} onApplyPreset={applyDuration} />
            <CustomPresets state={state} currentMinutes={inputMinutes} currentSeconds={inputSeconds} onApplyPreset={applyDuration} />
          </div>
        </div>

      </div>
    </main>
  );
}
