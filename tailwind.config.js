/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#FAF6F1',
          deep: '#F3ECE2',
          pale: '#FDFAF6',
        },
        ink: {
          DEFAULT: '#3D3530',
          muted: '#5C5048',
          soft: '#8B7F76',
        },
        purple: {
          DEFAULT: '#5D4A6E',
          soft: '#A78BB8',
          deep: '#3F2F4D',
          pale: '#E8DDF1',
        },
        pink: '#F5D6D9',
        sage: '#B8C4B1',
        border: {
          DEFAULT: '#EDE3D6',
          ink: '#D8CCBC',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8vw, 5.5rem)', { lineHeight: '1.02', letterSpacing: '-0.025em', fontWeight: '500' }],
        'display': ['clamp(2.5rem, 6vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.022em', fontWeight: '500' }],
        'h1': ['clamp(2rem, 4.5vw, 3rem)', { lineHeight: '1.1', letterSpacing: '-0.018em', fontWeight: '500' }],
        'h2': ['clamp(1.875rem, 3.5vw, 2.5rem)', { lineHeight: '1.15', letterSpacing: '-0.012em', fontWeight: '500' }],
        'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '500' }],
        'eyebrow': ['11px', { lineHeight: '1.2', letterSpacing: '0.24em', fontWeight: '600' }],
        'eyebrow-lg': ['12px', { lineHeight: '1.2', letterSpacing: '0.28em', fontWeight: '600' }],
        'caption': ['12px', { lineHeight: '1.5', letterSpacing: '0.02em', fontWeight: '400' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.875rem',
        full: '9999px',
      },
      maxWidth: {
        content: '1320px',
        prose: '62ch',
      },
      spacing: {
        section: '6rem',
        'section-lg': '9rem',
        'section-xl': '12rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
        editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      transitionDuration: {
        700: '700ms',
        900: '900ms',
        1200: '1200ms',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(61, 53, 48, 0.04), 0 12px 32px rgba(61, 53, 48, 0.06)',
        lift: '0 4px 14px rgba(61, 53, 48, 0.08), 0 24px 56px rgba(61, 53, 48, 0.10)',
      },
      backgroundImage: {
        'paper-grain':
          "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.24 0 0 0 0 0.21 0 0 0 0 0.19 0 0 0 0.045 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
