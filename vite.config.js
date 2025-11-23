import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(),react()],
    server: {
    historyApiFallback: true,  // ✅ REQUIRED for React Router refresh
  },

  preview: {
    historyApiFallback: true,  // ✅ REQUIRED for production preview
  },

})
