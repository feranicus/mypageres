import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // !!! ИСПРАВЛЕНИЕ ДЛЯ GITHUB PAGES !!!
  base: '/mypageres/', 
  
  plugins: [react()],
  build: {
    target: 'esnext'
  }
})