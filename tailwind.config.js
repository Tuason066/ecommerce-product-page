/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        kumbhSans: "'Kumbh Sans', sans-serif",
      },
      colors: {
        orange: {
          100: 'hsl(25, 100%, 94%)',
          200: 'hsl(26, 100%, 55%)',
        },
        blue: {
          100: 'hsl(223, 64%, 98%)',
          200: 'hsl(220, 14%, 75%)',
          300: 'hsl(219, 9%, 45%)',
          400: 'hsl(220, 13%, 13%)',
        },
        white: 'hsl(0, 0%, 100%)',
        black: {
          100: 'rgba(0,0,0,.75)',
          200: 'hsl(0, 0%, 0%)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};
