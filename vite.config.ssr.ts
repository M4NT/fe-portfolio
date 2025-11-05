import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Configuração para build SSR
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: true,
    rollupOptions: {
      input: {
        server: path.resolve(__dirname, 'src/entry-server.tsx'),
      },
      output: {
        dir: 'dist/server',
        format: 'es',
      },
      // Não externalizar react-router-dom para SSR
      external: ['fs', 'path', 'url', 'stream', 'util', 'crypto', 'http', 'https', 'net', 'os', 'buffer', 'events'],
    },
    ssrEmitAssets: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
    dedupe: ['react', 'react-dom', 'react-router-dom'],
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
  },
})

