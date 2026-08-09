import { defineConfig } from "tsup"
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions"

const env = process.env.NODE_ENV

export default defineConfig({
    entry: ["./src", "!src/**/*.spec.*", "!src/tests/**"],
    sourcemap: false,
    clean: true,
    target: "es2020",
    // tsup injects deprecated baseUrl for DTS; silence until upstream fix (egoist/tsup#1388)
    dts: {
        compilerOptions: {
            ignoreDeprecations: "6.0",
        },
    },
    skipNodeModulesBundle: true,
    format: ["cjs", "esm"],
    minify: env === "production",
    bundle: true,
    external: ["react", "react-dom"],
    esbuildPlugins: [
        esbuildPluginFilePathExtensions({
            esmExtension: "js",
            cjsExtension: "cjs",
        }),
    ],
})
