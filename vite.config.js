import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Set `base` to "/<repo-name>/" if you deploy to a GitHub Pages project site.
export default defineConfig({
  plugins: [react()],
  base: "./",
});
