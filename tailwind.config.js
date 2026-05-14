/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ── Oceaniasoft Brand Colours ──────────────────────────────
      colors: {
        navy: {
          DEFAULT: '#0a0e1a',   // page background
          surface:  '#111827',  // card / panel surface
          surface2: '#1a2236',  // elevated surface
          border:   '#ffffff14',// subtle border (rgba 8%)
        },
        amber: {
          DEFAULT:  '#f5a623',  // primary accent
          light:    '#ffc043',  // hover state
          dim:      '#f5a62326',// tinted bg (rgba 15%)
          glow:     '#f5a62359',// shadow glow (rgba 35%)
        },
        ink: {
          DEFAULT:  '#e8ecf4',  // primary text
          muted:    '#8b95a9',  // secondary text
        },
      },
      // ── Typography ────────────────────────────────────────────
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"DM Sans"', '"Helvetica Neue"', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      // ── Border Radius ─────────────────────────────────────────
      borderRadius: {
        card: '12px',
        'card-lg': '20px',
      },
      // ── Box Shadows ───────────────────────────────────────────
      boxShadow: {
        amber: '0 0 32px rgba(245,166,35,0.35)',
        lift:  '0 24px 64px rgba(0,0,0,0.4)',
        card:  '0 4px 24px rgba(0,0,0,0.3)',
      },
      // ── Keyframe Animations ───────────────────────────────────
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%,100%': { transform: 'scale(1)',   opacity: '1'   },
          '50%':     { transform: 'scale(1.1)', opacity: '0.7' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },
      animation: {
        'fade-up':     'fadeUp 0.6s cubic-bezier(0.25,0.46,0.45,0.94) both',
        'glow-pulse':  'glowPulse 6s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
