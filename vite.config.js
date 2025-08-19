import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Importez le module 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Racine du projet (src)
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      // Ajoutez d'autres alias au besoin
    },
  },
  server: {
    port: 3000,
    strictPort: true,
    hmr: {
      overlay: false,
    },
  },
 
});

