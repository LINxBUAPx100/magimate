import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Dominio personalizado (magimate.space) sirve desde la raíz.
  // Si algún día vuelves a <usuario>.github.io/magimate sin dominio, cambia a '/magimate/'.
  base: '/',
})
