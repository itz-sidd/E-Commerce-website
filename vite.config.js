import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
    hmr: false,
    watch: {
      ignored: ['**/node_modules/**', '**/dist/**']
    }
  }
})
