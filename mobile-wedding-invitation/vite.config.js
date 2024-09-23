import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: '@scss', replacement: '/src/scss' },
      { find: '@components', replacement: '/src/components' },
      { find: '@shared', replacement: '/src/components/shared' },
      { find: '@icons', replacement: '/src/components/shared/icons' },
      { find: '@sections', replacement: '/src/components/sections' },
      { find: '@utils', replacement: '/src/utils' },
    ],
  },
});
