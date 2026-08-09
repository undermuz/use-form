import type { FC, ReactNode } from "react"

import {
    getJsonFormHref,
    getPageBuilderHref,
} from "../lib/siteUrls"

const GITHUB = "https://github.com/undermuz/use-form"

type AppChromeProps = {
    showEditorControls?: boolean
    modeToggle?: ReactNode
    onDownload?: () => void
    onReset?: () => void
    isDirty?: boolean
    editBanner?: boolean
}

const linkClass =
    "font-mono text-xs text-uf-muted transition-colors hover:text-uf-text"

const AppChrome: FC<AppChromeProps> = ({
    showEditorControls = false,
    modeToggle,
    onDownload,
    onReset,
    isDirty = false,
    editBanner = false,
}) => {
    return (
        <header className="sticky top-0 z-50 border-b border-uf-border bg-uf-surface/75 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
                <div className="flex min-w-0 items-center gap-3">
                    <div
                        className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-uf-border bg-uf-glass"
                        aria-hidden
                    >
                        <span className="flex flex-col gap-0.5">
                            <span className="h-0.5 w-3.5 rounded-full bg-uf-primary" />
                            <span className="h-0.5 w-3.5 rounded-full bg-uf-text/80" />
                            <span className="h-0.5 w-2.5 rounded-full bg-uf-text/50" />
                        </span>
                    </div>
                    <div className="min-w-0">
                        <p className="truncate font-sans text-sm font-semibold tracking-tight text-uf-text">
                            use-form
                        </p>
                        <p className="truncate font-mono text-[10px] text-uf-muted">
                            hook-first React forms
                        </p>
                    </div>
                </div>

                {showEditorControls ? (
                    <div className="flex flex-wrap items-center justify-center gap-2">
                        {modeToggle}
                        <button
                            type="button"
                            onClick={onDownload}
                            className="rounded-full border border-uf-border bg-uf-elevated/80 px-3 py-1.5 font-mono text-xs font-medium text-uf-text transition hover:border-uf-secondary/40"
                        >
                            Download JSON
                        </button>
                        {isDirty ? (
                            <button
                                type="button"
                                onClick={onReset}
                                className="rounded-full border border-amber-400/60 bg-amber-400 px-3 py-1.5 font-mono text-xs font-semibold text-uf-surface transition hover:bg-amber-300"
                            >
                                Reset
                            </button>
                        ) : null}
                    </div>
                ) : null}

                <nav
                    className="flex flex-wrap items-center gap-x-4 gap-y-2"
                    aria-label="Project links"
                >
                    <a
                        className={linkClass}
                        href={GITHUB}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub
                    </a>
                    <a className={linkClass} href={getJsonFormHref()}>
                        react-json-form
                    </a>
                    <a className={linkClass} href={getPageBuilderHref()}>
                        page-builder
                    </a>
                    <a className={linkClass} href="#install">
                        Install
                    </a>
                    <a className={linkClass} href="#demo">
                        Demo
                    </a>
                </nav>
            </div>
            {editBanner ? (
                <p className="border-t border-uf-border/60 bg-uf-primary/10 px-4 py-2 text-center font-mono text-[11px] text-uf-text/90 sm:px-6">
                    Edit mode (DEV) — change blocks, then Download JSON to
                    refresh the seed. Switch to View for the public page.
                </p>
            ) : null}
        </header>
    )
}

export default AppChrome
