function withTrailingSlash(url: string): string {
    return url.endsWith("/") ? url : `${url}/`
}

function getCrossProjectHref(
    envKey: string,
    prodPath: string,
    devDefault: string
): string {
    const fromEnv = (import.meta.env as Record<string, string | undefined>)[
        envKey
    ]
    if (fromEnv) return withTrailingSlash(fromEnv)
    if (import.meta.env.PROD) return prodPath
    return withTrailingSlash(devDefault)
}

/** GH Pages: `/react-json-form/` · local: port 5173 */
export function getJsonFormHref(): string {
    return getCrossProjectHref(
        "VITE_JSON_FORM_URL",
        "/react-json-form/",
        "http://localhost:5173"
    )
}

/** GH Pages: `/use-form/` · local: port 5180 */
export function getUseFormHref(): string {
    return getCrossProjectHref(
        "VITE_USE_FORM_URL",
        "/use-form/",
        "http://localhost:5180"
    )
}

/** GH Pages: `/react-page-builder/` · local: port 5181 */
export function getPageBuilderHref(): string {
    return getCrossProjectHref(
        "VITE_PAGE_BUILDER_URL",
        "/react-page-builder/",
        "http://localhost:5181"
    )
}
