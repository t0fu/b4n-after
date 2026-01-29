import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  logLevel: 'warn',
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 3,
      },
      mangle: true,
      format: {
        comments: false,
      },
    },
  },
  plugins: [react()],
  server: {
    port: 45645,
  },
});
