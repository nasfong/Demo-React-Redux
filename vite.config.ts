import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/',
  plugins: [react()],
  define: {
    'process.env': {
      REACT_APP_API_URL: 'https://api-backend-wwx3.onrender.com'
      // REACT_APP_API_URL: 'http://localhost:8000'
    }
  }
})
