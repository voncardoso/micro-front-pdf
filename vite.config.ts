import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
const reactPlugin = react();

export default defineConfig({
  base: '/app-vite',
  server: {
    cors: true,
    port: 5173, // Substitua se necessário
  },
  build: {
    rollupOptions: {
      output: {
        format: 'es',
      },
    },
  },
  plugins: [react()],
  worker: {
    plugins: () => [reactPlugin],
    format: 'es',
  },
});
