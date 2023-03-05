const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
        matchers: {
            color: /(background|color)$/i,
            date: /Date$/,
        },
    },

    darkMode: {
        stylePreview: true,
        classTarget: "html",
    },
}

module.exports = { parameters }
