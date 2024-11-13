import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy requests to the backend server
      '/@me': 'http://localhost:5000', // Adjust the port if needed
      '/api': 'http://localhost:5000', // You can also add additional paths for other routes if necessary
    },
  },
})
