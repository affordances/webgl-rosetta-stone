import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
      "@state": "/src/state",
      "@components": "/src/components",
      "@r3f": "/src/r3f",
      "@threeJs": "/src/threeJs",
      "@webGl": "/src/webGl",
    },
  },
});
