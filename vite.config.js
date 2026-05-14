import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import mkcert from 'vite-plugin-mkcert'

export default defineConfig({
  plugins: [
    vue(),
    // Generate a locally-trusted SSL cert for the dev server so Shopify's
    // Customer Account API will accept the localhost callback URL (it
    // requires HTTPS on every redirect URI).
    mkcert(),
  ],
  server: {
    port: 5173,
    open: false,
  },
})
