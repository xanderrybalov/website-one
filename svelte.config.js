import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: [
    vitePreprocess(),
    {
      typescript: true,
      scss: true,
      postcss: true,
    },
  ],

  kit: {
    adapter: adapter(),
    alias: {
      $lib: 'src/lib',
      $routes: 'src/routes',
    },
  },
};

export default config;
