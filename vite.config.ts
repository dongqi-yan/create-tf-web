import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    // change my-app to your own app name
    outDir: path.resolve(__dirname, '../../dist/my-app'),
  },
  server: {
    proxy: {
      // demo
      // '/prod-api': {
      //   target: 'xxxx',
      //   changeOrigin: true,
      // },
    },
  },
})
