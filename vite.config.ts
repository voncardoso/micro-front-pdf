import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/app-vite',
  server: {
    cors: true,
    port: 5173, // Substitua se necessário
  },
  plugins: [react()],
});
