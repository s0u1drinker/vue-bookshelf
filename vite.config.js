import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import postcss from './.postcsssrc.js'
// import vueDevTools from 'vite-plugin-vue-devtools'

export default defineConfig({
  css: {
    postcss,
  },
  plugins: [
    vue(),
    //vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
