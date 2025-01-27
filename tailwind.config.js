/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,svelte,js,ts}'],
  theme: {
    extend: {
      colors: {
        primary: '#f7eee4',
        'text-black': '#030303',
        'text-white': '#fefefd',
      },
      fontWeight: {
        'header-light': '300',
        'header-semibold': '600',
        'header-bold': '700',
      },
      spacing: {
        'task-gap': '0.7rem',
        'input-padding': '0.75rem',
        'container-padding': '2rem 0.5rem',
        'button-padding-x': '3.5rem',
        'button-padding-y': '0.8rem',
        'button-container-gap': '2rem',
        'negative-button': '-1.5rem',
        'input-margin-y': '2rem',
        'input-padding-x': '0.5rem',
        'button-negative': '-1.5rem',
      },
      fontSize: {
        'header-title': ['2.25rem', { lineHeight: '2.5rem' }],
        'button-text': ['1.45rem', { lineHeight: '1.3rem' }],
      },
      maxWidth: {
        container: '20rem',
        emojis: '2rem',
      },
      borderRadius: {
        'task-item': '0.5rem',
        container: '0.5rem',
        button: '9999px',
      },
      borderWidth: {
        'header-line': '0.3rem',
      },
      ringWidth: {
        'input-ring': '2px',
      },
      boxShadow: {
        container: '0 4px 6px rgba(0, 0, 0, 0.1)',
        button: '0 2px 4px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
