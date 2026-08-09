import path from "node:path"
import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const root = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    // GitHub Pages project site: https://undermuz.github.io/use-form/
    base: process.env.BASE_PATH || "/",
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            "@undermuz/use-form": path.resolve(
                root,
                "../../packages/use-form/src/index.ts"
            ),
        },
    },
    server: {
        host: true,
        port: 5180,
    },
    preview: {
        host: true,
    },
})
