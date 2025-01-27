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
        'header-padding': '3rem',
        'menu-text-padding': '1rem',
      },
    },
  },
  plugins: [],
};
