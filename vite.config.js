import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 8080,
  },
  build: {
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 1500,
  },
});
