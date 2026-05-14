/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F1',
        ink: {
          DEFAULT: '#3D3530',
          muted: '#5C5048',
        },
        purple: {
          DEFAULT: '#5D4A6E',
          soft: '#A78BB8',
          deep: '#4A3858',
        },
        pink: '#F5D6D9',
        sage: '#B8C4B1',
        border: '#EDE3D6',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Nunito', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.5rem, 6vw, 3.75rem)', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h1': ['clamp(2rem, 4.5vw, 3rem)', { lineHeight: '1.15', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h2': ['clamp(1.75rem, 3.5vw, 2.25rem)', { lineHeight: '1.2', fontWeight: '600' }],
        'h3': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '600' }],
        'eyebrow': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.18em', fontWeight: '600' }],
      },
      borderRadius: {
        DEFAULT: '0.75rem',
        lg: '1rem',
        full: '9999px',
      },
      maxWidth: {
        content: '1280px',
      },
      spacing: {
        section: '5rem',
        'section-lg': '7rem',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(61, 53, 48, 0.04), 0 8px 24px rgba(61, 53, 48, 0.06)',
        lift: '0 4px 12px rgba(61, 53, 48, 0.08), 0 16px 40px rgba(61, 53, 48, 0.10)',
      },
    },
  },
  plugins: [],
}
