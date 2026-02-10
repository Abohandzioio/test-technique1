/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Couleurs inspirées de Mü être (ajustez selon la charte)
        primary: {
          DEFAULT: '#7C3AED', // Violet
          light: '#A78BFA',
          dark: '#5B21B6',
        },
        secondary: {
          DEFAULT: '#FBBF24', // Jaune
          light: '#FDE68A',
          dark: '#F59E0B',
        },
      },
    },
  },
  plugins: [],
}
