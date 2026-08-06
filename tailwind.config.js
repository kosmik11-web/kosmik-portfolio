/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        mono: ['DM Mono', 'monospace'],
      },
      colors: {
        ink: '#0b0d0e',
        paper: '#f1f0eb',
        acid: '#c9b78e',
        coral: '#b88068',
        lilac: '#aab6c4',
      },
    },
  },
  plugins: [],
};
