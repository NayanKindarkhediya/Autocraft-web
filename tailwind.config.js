/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#030304',
        coal: '#0a0b0e',
        panel: '#101217',
        bone: '#efece6',
        accent: { DEFAULT: '#1a7bff', soft: '#5aa2ff', cyan: '#22d3ee' },
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { tightest: '-0.045em' },
      keyframes: {
        marquee: { '0%': { transform: 'translateX(0)' }, '100%': { transform: 'translateX(-50%)' } },
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseDot: { '0%,100%': { opacity: 1, transform: 'scale(1)' }, '50%': { opacity: 0.4, transform: 'scale(1.6)' } },
      },
      animation: { marquee: 'marquee 38s linear infinite', float: 'float 6s ease-in-out infinite', pulseDot: 'pulseDot 2s ease-in-out infinite' },
    },
  },
  plugins: [],
};
