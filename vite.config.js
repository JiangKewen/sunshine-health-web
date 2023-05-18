import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
        modifyVars: {
          // '@primary-color': '#0960bd' // 全局主色
        }
      }
    }
  },
  server: {
    open: true,
    proxy: {
      '/auth': {
        target: 'https://jiajianup.top',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, '')
      }
    }
  }
})
