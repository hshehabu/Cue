import type { Metadata } from 'next';
import { TimerTypeGrid } from '@/components/TimerTypeCard';
import { TIMER_TYPES } from '@/data/timerTypes';

export const metadata: Metadata = {
  title: 'Cue — Timers',
  description: 'Simple timers for whatever you\'re doing.',
};

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col px-6 md:px-8 py-12 md:py-16">
      <div className="w-full max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-[32px] font-light text-black tracking-[-0.03em] leading-none mb-2">
            Timers
          </h1>
          <p className="text-[14px] text-[#C3C3C2] font-light">
            Simple timers for whatever you&apos;re doing.
          </p>
        </div>
        <TimerTypeGrid timerTypes={TIMER_TYPES} />
      </div>
    </main>
  );
}
