import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv'

dotenv.config();

export default defineConfig(({ mode }) => {
  return {
    plugins: [vue()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_URL || 'https://killianfauvette.fr',
          changeOrigin: true,
        }
      }
    }
  }
})