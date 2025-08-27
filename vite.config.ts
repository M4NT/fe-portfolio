import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

console.log("VERCEL_ENV:", process.env.VERCEL_ENV);
console.log("NODE_ENV:", process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  }
}) 