import { defineConfig } from "tsup"
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions"

const env = process.env.NODE_ENV

export default defineConfig({
    entry: ["./src", "!./src/stories/**/*", "!src/**/*.spec.*"],
    sourcemap: false,
    clean: true,
    target: "es2019",
    dts: true,
    skipNodeModulesBundle: true,
    format: ["cjs", "esm"],
    minify: env === "production",
    bundle: true,
    external: [
        "rsuite",
        "grommet",
        "chakra-ui",
        "stories",
        "react",
        "react-dom",
        "node_modules",
    ],
    esbuildPlugins: [
        esbuildPluginFilePathExtensions({
            esmExtension: "js",
            cjsExtension: "cjs",
        }),
    ],
})
