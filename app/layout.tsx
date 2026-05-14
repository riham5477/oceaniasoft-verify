import type { Metadata } from 'next';
import './globals.css';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export const metadata: Metadata = {
  title: {
    template: '%s | Oceaniasoft',
    default:  'Oceaniasoft — Document Verification',
  },
  description: 'Verify credentials and certificates issued by Oceaniasoft.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col bg-navy text-ink font-body">
        {/* ── Shared Navigation ─────────────────────────── */}
        <Header />

        {/* ── Page Content ──────────────────────────────── */}
        <main className="flex-1">
          {children}
        </main>

        {/* ── Shared Footer ─────────────────────────────── */}
        <Footer />
      </body>
    </html>
  );
}
