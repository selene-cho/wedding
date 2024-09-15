import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createPreloadTags } from './src/utils/fontPreload';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    createHtmlPlugin({
      inject: {
        tags: createPreloadTags,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': '/src',
      '@scss': '/src/scss',
    },
  },
});
