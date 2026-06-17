import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base '/' — served at the apex domain itzen.ai (see public/CNAME).
export default defineConfig({
  plugins: [react()],
  base: '/',
})
