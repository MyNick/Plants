import path from "path"
import glob from "glob"
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  root: path.join(__dirname, "src"),
  server: { port: 8000 },
  build: {
    outDir: path.join(__dirname, "dist"),
    rollupOptions: {
        input: glob.sync(path.resolve(__dirname, "src", "*.html")),
    }
  }
});
