import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": "http://127.0.0.1:3000/",
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: "./src/main.jsx",
        InventoryTable:
          "./src/pages/InventoryManagement/InventoryTable/InventoryTable.jsx",
        InventoryTableCSS:
          "./src/pages/InventoryManagement/InventoryTable/InventoryTable.css",
      },
    },
  },
});
