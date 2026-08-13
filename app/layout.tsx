import type { Metadata } from 'next';
import './globals.css';
import { AppHeader } from '@/components/AppHeader';

export const metadata: Metadata = {
  title: 'Cue',
  description: 'Simple timers for whatever you\'re doing.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full flex flex-col bg-white text-[#363635] antialiased">
        <AppHeader />
        {children}
        <footer className="border-t border-[#C3C3C2] px-6 md:px-8 py-4 shrink-0">
          <p className="text-[12px] text-[#C3C3C2] font-light max-w-5xl mx-auto">
            Cue — Simple timers for whatever you&apos;re doing.
          </p>
        </footer>
      </body>
    </html>
  );
}
