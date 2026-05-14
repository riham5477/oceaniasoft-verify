'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Scroll detection for frosted-glass effect */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? 'bg-navy/85 backdrop-blur-xl border-b border-navy-border py-3'
          : 'bg-transparent py-5'}
      `}
    >
      <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">

        {/* ── Logo ──────────────────────────────────────── */}
        <Link href="https://oceaniasoft.com" className="flex items-center gap-2 group">
          {/*
            ★ LOGO SWAP — replace the span below with:
            <img src="/logo.png" alt="Oceaniasoft" className="h-8 w-auto" />
          */}
          <span className="font-display text-2xl font-bold text-white tracking-tight">
            Oceaniasoft
            <span className="text-amber">.</span>
          </span>
        </Link>

        {/* ── Desktop Nav ───────────────────────────────── */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink href="https://oceaniasoft.com">Home</NavLink>
          

          {/* Verify CTA */}
          <Link
            href="https://oceaniasoft.com/#contact"
            className="
              flex items-center gap-2 bg-amber text-navy font-semibold text-sm
              px-5 py-2.5 rounded-card transition-all duration-200
              hover:bg-amber-light hover:-translate-y-0.5 hover:shadow-amber
            "
          >
            <ShieldCheck size={15} strokeWidth={2.5} />
            Contact Us
          </Link>
        </nav>

        {/* ── Hamburger (mobile) ────────────────────────── */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-ink-muted hover:text-white transition-colors p-1"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Dropdown ───────────────────────────────── */}
      <div
        className={`
          md:hidden overflow-hidden transition-all duration-300
          ${menuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'}
          bg-navy/97 backdrop-blur-xl border-b border-navy-border
        `}
      >
        <nav className="flex flex-col px-6 py-4 gap-4">
          <MobileLink href="https://oceaniasoft.com"                    onClick={() => setMenuOpen(false)}>Home</MobileLink>
          <MobileLink href="https://oceaniasoft.com" onClick={() => setMenuOpen(false)}>Contact Us</MobileLink>
          
        </nav>
      </div>
    </header>
  );
}

/* ── Sub-components ─────────────────────────────────────────────── */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-sm font-medium text-ink-muted hover:text-white transition-colors relative group"
    >
      {children}
      <span className="
        absolute -bottom-1 left-0 w-0 h-0.5 bg-amber rounded-full
        transition-all duration-200 group-hover:w-full
      " />
    </Link>
  );
}

function MobileLink({
  href, children, onClick,
}: {
  href: string; children: React.ReactNode; onClick: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-base font-medium text-ink-muted hover:text-amber transition-colors py-1
                 border-b border-navy-border last:border-0 pb-3 last:pb-0"
    >
      {children}
    </Link>
  );
}
