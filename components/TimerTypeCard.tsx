import Link from 'next/link';
import { ChefHat } from 'lucide-react';
import type { TimerType } from '@/types';

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number }>> = {
  ChefHat,
};

export function TimerTypeCard({ timerType }: { timerType: TimerType }) {
  const Icon = ICON_MAP[timerType.icon] ?? ChefHat;

  return (
    <Link
      href={timerType.route}
      className="
        group flex flex-col gap-3 p-5
        border border-[#C3C3C2] rounded-[5px]
        bg-white
        hover:bg-[#F5F5F5] hover:border-[#363635]
        transition-colors duration-100
        select-none
      "
      aria-label={`${timerType.name} — ${timerType.description}`}
    >
      <span className="text-[#363635] group-hover:text-black transition-colors">
        <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
      </span>
      <div>
        <p className="text-[14px] font-medium text-black leading-snug">{timerType.name}</p>
        <p className="text-[12px] text-[#C3C3C2] font-light mt-0.5 leading-snug">{timerType.description}</p>
      </div>
    </Link>
  );
}

export function TimerTypeGrid({ timerTypes }: { timerTypes: TimerType[] }) {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 240px))' }}
      role="list"
    >
      {timerTypes.map((t) => (
        <div key={t.id} role="listitem">
          <TimerTypeCard timerType={t} />
        </div>
      ))}
    </div>
  );
}
