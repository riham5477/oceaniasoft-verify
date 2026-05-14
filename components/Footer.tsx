import Link from 'next/link';
import { ShieldCheck, Linkedin, Twitter, Github, Instagram } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-surface border-t border-navy-border">
      <div className="max-w-[1200px] mx-auto px-6 pt-14 pb-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10">

          {/* Brand */}
          <div>
            <span className="font-display text-xl font-bold text-white">
              Oceaniasoft<span className="text-amber">.</span>
            </span>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed max-w-xs">
              Building the digital infrastructure of tomorrow, today.
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-1">Quick Links</p>
            {[
              { label: 'Home', href: 'https://oceaniasoft.com' },
              { label: 'Services',   href: 'https://oceaniasoft.com'   },
              { label: 'Team',          href: 'https://oceaniasoft.com'           },
              { label: 'Contact',           href: 'https://oceaniasoft.com'            },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm text-ink-muted hover:text-amber transition-colors">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Verification note */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-amber mb-3">
              Document Verification
            </p>
            <div className="flex items-start gap-3 p-4 rounded-card bg-navy border border-navy-border">
              <ShieldCheck size={20} className="text-amber flex-shrink-0 mt-0.5" />
              <p className="text-xs text-ink-muted leading-relaxed">
                All credentials issued by Oceaniasoft are digitally registered. Scan any QR code or
                enter a certificate ID at{' '}
                <span className="text-amber font-medium">oceaniasoft.com/verify/[ID]</span> to
                instantly confirm authenticity.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-navy-border pt-6 flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <p className="text-xs text-ink-muted">
            © {year} Oceaniasoft. All rights reserved.
          </p>

          {/* Social icons */}
          <div className="flex gap-3">
            {[
              { icon: Linkedin,  label: 'LinkedIn'  },
              { icon: Twitter,   label: 'Twitter/X' },
              { icon: Github,    label: 'GitHub'    },
              { icon: Instagram, label: 'Instagram' },
            ].map(({ icon: Icon, label }) => (
              <a key={label} href="#" aria-label={label}
                className="w-8 h-8 rounded-card bg-navy border border-navy-border flex items-center
                           justify-center text-ink-muted hover:bg-amber hover:border-amber
                           hover:text-navy transition-all duration-200 hover:-translate-y-0.5">
                <Icon size={14} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
