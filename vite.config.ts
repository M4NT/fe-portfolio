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
        passes: 4,
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        dead_code: true,
        unused: true,
        side_effects: false,
        collapse_vars: true,
        reduce_vars: true,
        hoist_funs: true,
        hoist_vars: true
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
    rollupOptions: {
      output: {
        // Code splitting otimizado - apenas chunks essenciais
        manualChunks: (id) => {
          // Vendor chunks otimizados para reduzir tamanho
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