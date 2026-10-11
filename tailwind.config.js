/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pujo: {
          vermilion: '#dc2626',
          'vermilion-dark': '#b91c1c',
          maroon: '#881337',
          'maroon-dark': '#4c0519',
          orange: '#ea580c',
          'orange-dark': '#c2410c',
          gold: '#d97706',
          'gold-light': '#fef3c7',
          cream: '#fdfbf7',
          'cream-dark': '#f5ede0',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        display: ['Cinzel', '"Playfair Display"', 'serif'],
        sans: ['Inter', '"Noto Sans Bengali"', 'sans-serif'],
      },
      boxShadow: {
        'pujo-card': '0 4px 20px -2px rgba(136, 19, 55, 0.08), 0 2px 6px -1px rgba(220, 38, 38, 0.04)',
        'pujo-hover': '0 10px 25px -3px rgba(136, 19, 55, 0.15), 0 4px 10px -2px rgba(220, 38, 38, 0.08)',
      },
    },
  },
  plugins: [],
}
