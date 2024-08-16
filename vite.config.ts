import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import refiber from "refiber-vite-plugin";
import path from "path";

export const alias = [
  {
    find: "components",
    replacement: path.resolve(__dirname, "./resources/js/components"),
  },
  {
    find: "lib",
    replacement: path.resolve(__dirname, "./resources/js/lib"),
  },
  {
    find: "types",
    replacement: path.resolve(__dirname, "./resources/js/types"),
  },
  {
    find: "css",
    replacement: path.resolve(__dirname, "./resources/css"),
  },
];

// https://vitjs.dev/config/
export default defineConfig({
  plugins: [
    refiber({
      input: ["resources/js/app.tsx"],
      refresh: true,
    }),
    react(),
  ],
  resolve: { alias },
});
