'use client';

import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { AudioSelector } from '@/components/AudioSelector';
import { useSettings } from '@/hooks/useSettings';

export default function SettingsPage() {
  const { alarmSoundId, setAlarmSoundId } = useSettings();
  const router = useRouter();

  return (
    <main className="flex-1 flex flex-col px-6 md:px-8 py-8 md:py-12">
      <div className="w-full max-w-xl mx-auto flex flex-col gap-8">

        <nav>
          <button onClick={() => router.back()} className="inline-flex items-center gap-1.5 text-[13px] text-[#C3C3C2] hover:text-[#363635] transition-colors cursor-pointer bg-transparent border-none p-0">
            <ArrowLeft size={14} strokeWidth={1.5} aria-hidden="true" />
            <span>Back</span>
          </button>
        </nav>

        <h1 className="text-[28px] font-light text-black tracking-[-0.03em] leading-none">
          Settings
        </h1>

        <hr className="border-[#EBEBEB]" />

        <section aria-labelledby="alarm-heading">
          <div className="mb-4">
            <h2 id="alarm-heading" className="text-[15px] font-medium text-black">Alarm sound</h2>
            <p className="text-[13px] text-[#C3C3C2] font-light mt-1">
              Choose the sound played when a timer finishes.
            </p>
          </div>
          <AudioSelector selectedId={alarmSoundId} onSelect={setAlarmSoundId} />
        </section>

      </div>
    </main>
  );
}
