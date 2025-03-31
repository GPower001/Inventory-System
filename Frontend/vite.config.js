import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    , tailwindcss()
  ],
  define: {
    'import.meta.env.VITE_SENTRY_DSN':JSON.stringify(process.env.VITE_SENTRY_DSN),
  }
});
