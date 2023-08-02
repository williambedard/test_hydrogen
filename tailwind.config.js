module.exports = {
  purge: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    flex: {
      50: '1 50%',
      10: '1 10%',
    },
    extend: {
      minWidth: {
        420: '420px',
      },
      spacing: {
        128: '32rem',
      },
      keyframes: {
        hue: {
          '0%': {filter: 'saturate(200%) hue-rotate(-10deg)'},
          '100%': {filter: 'saturate(200%) hue-rotate(30deg)'},
        },
      },
      animation: {
        hue: 'hue 15s linear infinite alternate',
      },
      saturate: {
        200: '2',
      },
      height: {
        150: '32rem',
        100: '28rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
