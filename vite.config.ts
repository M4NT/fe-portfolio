import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist/client',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
      },
      output: {
        // Code splitting otimizado - apenas chunks essenciais
        manualChunks: (id) => {
          // Vendor chunks ultra otimizados para reduzir tamanho
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
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            // Agrupar vendors menores
            return 'vendor-misc';
          }
          
          // App chunks por funcionalidade - mais granular
          if (id.includes('/components/Hero')) {
            return 'app-hero';
          }
          if (id.includes('/components/About')) {
            return 'app-about';
          }
          if (id.includes('/components/Projects') || id.includes('/components/SelectedWorks')) {
            return 'app-projects';
          }
          if (id.includes('/components/Services')) {
            return 'app-services';
          }
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
    // Otimizações de performance agressivas
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: false,
        // pure_funcs: ['console.log', 'console.info', 'console.debug', 'console.warn'],
        passes: 2,
        unsafe: false,
        dead_code: false,
        unused: false,
        side_effects: true
      },
      mangle: {
        toplevel: true,
        properties: {
          regex: /^_/
        }
      },
      format: {
        comments: false
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