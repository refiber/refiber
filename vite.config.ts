import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import refiber from "refiber-vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export const alias = [
  {
    find: "@",
    replacement: path.resolve(__dirname, "./resources/js"),
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
    tailwindcss(),
  ],
  resolve: { alias },
});
