import path from "path";
import react from "@vitejs/plugin-react-swc";
import refiber from "refiber-vite-plugin";
import { defineConfig } from "vite";
import { alias } from "./vite.config";

// https://vitjs.dev/config/
export default defineConfig({
  plugins: [
    refiber({
      input: ["resources/js/ssr.tsx"],
    }),
    react(),
  ],
  build: {
    manifest: false,
    rollupOptions: {
      output: {
        entryFileNames: "ssr.js",
        format: "cjs",
        dir: path.resolve(__dirname, "./public/build/ssr"),
      },
    },
  },
  resolve: { alias },
});
