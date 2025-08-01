import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCaseOnly"
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/variables.scss";
          @use "/src/animations.scss";
        `
      }
    }
  }
})
