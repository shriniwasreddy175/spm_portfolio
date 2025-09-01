import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import path from "node:path"
import { fileURLToPath } from "node:url"

// __dirname workaround for ESM
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig({
  base: "./", // ensures relative paths for assets
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
