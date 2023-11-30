/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        progress: 'progress 2s infinite',
      },
      keyframes: {
        progress: {
          '0%': { width: '0' },
          '50%': { width: '50%' },
          '100%': { width: '100%' },
        },
      },
    },
  },
  plugins: [],
};
