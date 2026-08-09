import react from "@vitejs/plugin-react"
import { playwright } from "@vitest/browser-playwright"
import { defineConfig } from "vitest/config"

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        setupFiles: ["./vitest.setup.ts"],
        include: ["src/**/*.{spec,test}.{ts,tsx}"],
        browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            api: {
                host: "127.0.0.1",
            },
            instances: [{ browser: "chromium" }],
        },
    },
})
