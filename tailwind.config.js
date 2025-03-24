import { defineConfig } from 'tailwindcss';

export default defineConfig({
  important: true, // ✅ Ensures Tailwind styles override Bootstrap
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"], // ✅ Scans these files for Tailwind usage
  theme: {
    extend: {},
  },
  plugins: [],
});
