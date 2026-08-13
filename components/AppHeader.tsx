import Link from 'next/link';
import { Settings } from 'lucide-react';

export function AppHeader() {
  return (
    <header className="border-b border-[#C3C3C2] h-14 flex items-center px-6 md:px-8 shrink-0">
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-[15px] font-medium text-black tracking-[-0.02em] hover:opacity-60 transition-opacity"
        >
          Cue
          <span className="inline-block w-[5px] h-[5px] rounded-full bg-black opacity-30" aria-hidden="true" />
        </Link>

        <Link
          href="/settings"
          aria-label="Open settings"
          className="text-[#C3C3C2] hover:text-[#363635] transition-colors p-1"
        >
          <Settings size={18} strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </div>
    </header>
  );
}
