import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Otimizações de performance agressivas
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/
        }
      }
    },
    rollupOptions: {
      output: {
        // Code splitting otimizado - apenas chunks essenciais
        manualChunks: (id) => {
          // Vendor chunks críticos apenas
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('lucide-react')) {
              return 'vendor-icons';
            }
            // Agrupar outros vendors menores
            return 'vendor-misc';
          }
          
          // App chunks por funcionalidade
          if (id.includes('/components/')) {
            return 'app-components';
          }
          if (id.includes('/pages/')) {
            return 'app-pages';
          }
          if (id.includes('/blog/')) {
            return 'app-blog';
          }
        },
        // Otimizar nomes de arquivos
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Otimizações adicionais
    sourcemap: false,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  },
  // Otimizações de desenvolvimento
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      'lucide-react'
    ]
  }
}) 