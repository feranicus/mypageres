import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/',          // 👈 было /mypageres/, делаем корень
  plugins: [react()],
});
