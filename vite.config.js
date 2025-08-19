// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import path from "path"; // Importez le module 'path'

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": path.resolve(__dirname, "./src"), // Racine du projet (src)
//       "@components": path.resolve(__dirname, "./src/components"),
//       "@pages": path.resolve(__dirname, "./src/pages"),
//       "@utils": path.resolve(__dirname, "./src/utils"),
//       "@assets": path.resolve(__dirname, "./src/assets"),
//       "@hooks": path.resolve(__dirname, "./src/hooks"),
//       // Ajoutez d'autres alias au besoin
//     },
//   },
//   server: {
//     port: 3000,
//     strictPort: true,
//     hmr: {
//       overlay: false,
//     },
//   },
//   build: {
//     outDir: "dist",
//     assetsInlineLimit: 4096,
//     chunkSizeWarningLimit: 1000,
//     rollupOptions: {
//       output: {
//         // manualChunks: {
//         //   react: ["react", "react-dom", "react-router-dom"],
//         //   auth: ["./src/pages/auth"],
//         //   child: ["./src/pages/child"],
//         //   parent: ["./src/pages/parent"],
//         //   admin: ["./src/pages/admin"],
//         // },
//       },
//     },
//   },
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
