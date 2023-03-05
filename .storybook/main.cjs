module.exports = {
    stories: [
        "../src/stories/**/*.stories.mdx",
        "../src/stories/**/*.stories.@(js|jsx|ts|tsx)",
    ],
    addons: [
        "@storybook/addon-links",
        "@storybook/addon-essentials",
        "@storybook/addon-interactions",
        "storybook-preset-less",
        "storybook-dark-mode",
        // "storybook-addon-dark-mode-toggle"
    ],
    // framework: "@storybook/react",
    core: {
        builder: "@storybook/builder-webpack5",
        disableTelemetry: true,
    },
    webpackFinal: async (config) => {
        const customConfig = { ...config }

        customConfig.resolve.extensions.push(".ts", ".tsx")
        // use ts-loader to process typescript files
        // customConfig.module.rules.push({
        //     test: /\.tsx?$/,
        //     use: "ts-loader",
        //     exclude: /node_modules/,
        // })
        // Configure webpack to allow using .js extension for typescript file imports.
        // You only need this if you're adding .js to relative imports in your project.
        // Refer: https://github.com/microsoft/TypeScript/issues/42813#issuecomment-942633095
        // customConfig.resolve.extensionAlias = {
        //     ".js": [".tsx", ".ts", ".js"],
        // }
        customConfig.module.rules.push({
            test: /.storybook\/preview.js/,
            resolve: { fullySpecified: false },
        })
        return customConfig
    },
}
