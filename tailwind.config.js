/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#f7eee4',
        secondary: '#cfc6be',
        'text-black': '#030303',
        'text-white': '#fefefd',
      },
      fontWeight: {
        'header-light': '300',
        'header-semibold': '600',
        'header-bold': '700',
      },
      spacing: {
        'primary-padding': '3rem 3.5rem',
        'primary-padding': '2rem 3.5rem',
        'menu-text-padding': '1rem',
        'thumbnail-gap': '1.5rem',
        'button-padding-x': '6rem !important',
        'button-padding-y': '1.25rem !important',
      },
      height: {
        'thumbnail-upper': '60%',
        'thumbnail-lower': '40%',
      },
      minWidth: {
        button: '200px !important',
      },
    },
  },
  plugins: [],
};
