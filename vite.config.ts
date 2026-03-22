// ============================================================
// vite.config.ts
// Konfigurasi Vite. Sudah dibersihkan dari semua Replit dependency.
// PORT dan BASE_PATH tidak lagi diperlukan - Vercel handle sendiri.
// ============================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  plugins: [
    react(),        // Untuk JSX dan Fast Refresh saat development
    tailwindcss(),  // Tailwind CSS v4
  ],
  resolve: {
    alias: {
      // "@" = shortcut ke folder src/
      // Contoh: "@/lib/utils" = "src/lib/utils"
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
  },
});
