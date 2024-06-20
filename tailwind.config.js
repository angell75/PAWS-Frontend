/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-bg': "url('/src/assets/login-background.png')",
        'register-bg': "url('/src/assets/register-background.png')",
      },
      colors: {
        teal: {
          DEFAULT: '#1693a5',
        },
        orange: {
          DEFAULT: '#FF9900',
          600: '#FF8000',
          700: '#CC6600',
        },
        title: '#607984',
        customBg: '#E2E9FE',
        petBg: '#FFF9F5',
        blogBg: '#B3AA99',
      },
      boxShadow: {
        glass: '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};
