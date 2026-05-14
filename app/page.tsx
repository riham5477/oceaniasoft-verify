import Link from 'next/link';
import { ShieldCheck, QrCode, Search } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Home — Document Verification System' };

export default function HomePage() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-20">

      {/* Dot-grid background */}
      <div className="absolute inset-0 bg-dot-grid pointer-events-none" />

      {/* Amber glow */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] pointer-events-none
                      bg-[radial-gradient(circle,rgba(245,166,35,0.12)_0%,transparent_65%)]
                      animate-glow-pulse" />

      <div className="relative max-w-[1200px] mx-auto px-6 text-center">

        {/* Badge */}
        <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest
                         uppercase text-amber bg-amber-dim border border-amber/25
                         px-4 py-2 rounded-full mb-8">
          <ShieldCheck size={13} strokeWidth={2.5} />
          Credential Verification Platform
        </span>

        {/* Headline */}
        <h1 className="font-display text-5xl md:text-7xl font-extrabold text-white
                       leading-[1.1] tracking-tight mb-6">
          Verify Any<br />
          <em className="text-amber italic">Credential</em> Instantly
        </h1>

        <p className="text-lg text-ink-muted max-w-xl mx-auto mb-12 leading-relaxed">
          Enter a certificate ID or scan a QR code to instantly confirm the authenticity of any
          document issued by Oceaniasoft.
        </p>

        {/* CTA Group */}
        <div className="flex flex-wrap gap-4 justify-center mb-20">
          <Link href="/verify/OS-2024-0001"
            className="flex items-center gap-2 bg-amber text-navy font-semibold px-7 py-4 rounded-card
                       hover:bg-amber-light hover:-translate-y-1 hover:shadow-amber
                       transition-all duration-200">
            <Search size={16} strokeWidth={2.5} />
            Verify a Document
          </Link>
          <Link href="/admin/generate-qr"
            className="flex items-center gap-2 bg-transparent border border-navy-border text-ink
                       font-semibold px-7 py-4 rounded-card hover:border-amber hover:text-amber
                       hover:-translate-y-1 transition-all duration-200">
            <QrCode size={16} strokeWidth={2.5} />
            Generate QR Code
          </Link>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {features.map((f) => (
            <div key={f.title}
              className="card-hover bg-navy-surface border border-navy-border rounded-card-lg p-8">
              <div className="w-12 h-12 rounded-card bg-amber-dim border border-amber/20
                              flex items-center justify-center text-amber mb-5">
                <f.icon size={22} />
              </div>
              <h3 className="font-semibold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-ink-muted leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Sample IDs hint */}
        <div className="mt-16 p-5 rounded-card bg-navy-surface border border-navy-border
                        inline-block text-left">
          <p className="text-xs font-semibold text-amber uppercase tracking-widest mb-3">
            Try a sample certificate ID
          </p>
          <div className="flex flex-wrap gap-3">
            {['OS-2024-0001', 'OS-2024-0002', 'OS-2025-0001'].map((id) => (
              <Link key={id} href={`/verify/${id}`}
                className="font-mono text-xs text-ink-muted bg-navy border border-navy-border
                           px-3 py-1.5 rounded hover:border-amber hover:text-amber transition-colors">
                {id}
              </Link>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

/* ── Feature list ─────────────────────────────────────────────────── */
import { BadgeCheck, QrCode as QrCodeIcon, Lock } from 'lucide-react';

const features = [
  {
    icon:  BadgeCheck,
    title: 'Instant Verification',
    desc:  'Confirm any credential in seconds. Every certificate is cryptographically registered with a unique ID.',
  },
  {
    icon:  QrCodeIcon,
    title: 'QR Code Generator',
    desc:  'Create scannable QR codes for each credential. Recipients can share their verified status with anyone.',
  },
  {
    icon:  Lock,
    title: 'Tamper-Proof Records',
    desc:  'Certificates are issued and stored by Oceaniasoft. Any alteration is immediately detectable.',
  },
];
