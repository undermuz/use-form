import { useState, type FC } from "react"
import { highlight } from "sugar-high"
import { json } from "sugar-high/presets"

type CodePanelProps = {
    filename?: string
    code: string
    className?: string
    language?: "tsx" | "json" | "bash"
    copyText?: string
    copyable?: boolean
}

function detectLanguage(
    filename: string | undefined,
    language: CodePanelProps["language"]
): NonNullable<CodePanelProps["language"]> {
    if (language) return language
    if (!filename) return "tsx"
    const lower = filename.toLowerCase()
    if (
        lower === "terminal" ||
        lower.endsWith(".sh") ||
        lower.endsWith(".bash")
    ) {
        return "bash"
    }
    if (lower.endsWith(".json")) return "json"
    return "tsx"
}

function highlightCode(
    code: string,
    language: NonNullable<CodePanelProps["language"]>
): string {
    if (language === "json") {
        return highlight(code, { ...json })
    }
    if (language === "bash") {
        return highlight(code, {
            keywords: new Set([
                "npm",
                "npx",
                "yarn",
                "pnpm",
                "i",
                "install",
                "add",
            ]),
        })
    }
    return highlight(code)
}

const CodePanel: FC<CodePanelProps> = ({
    filename,
    code,
    className = "",
    language,
    copyText,
    copyable = false,
}) => {
    const [copied, setCopied] = useState(false)
    const lang = detectLanguage(filename, language)
    const html = highlightCode(code, lang)

    const onCopy = async () => {
        const text = copyText ?? code
        try {
            await navigator.clipboard.writeText(text)
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1600)
        } catch {
            // ignore clipboard errors
        }
    }

    return (
        <div
            className={`glass sh-theme overflow-hidden rounded-xl shadow-[0_20px_60px_rgb(0_0_0_/0.45)] ${className}`}
        >
            <div className="flex items-center gap-3 border-b border-uf-border px-4 py-3">
                <div className="flex gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="size-2.5 rounded-full bg-[#febc2e]" />
                    <span className="size-2.5 rounded-full bg-[#28c840]" />
                </div>
                {filename ? (
                    <span className="flex-1 text-center font-mono text-xs text-uf-muted">
                        {filename}
                    </span>
                ) : (
                    <span className="flex-1" />
                )}
                {copyable ? (
                    <button
                        type="button"
                        onClick={onCopy}
                        className="shrink-0 rounded-md border border-uf-border px-2.5 py-1 font-mono text-[11px] text-uf-muted transition hover:border-uf-primary/50 hover:text-uf-text"
                    >
                        {copied ? "Copied" : "Copy"}
                    </button>
                ) : (
                    <span className="w-10" aria-hidden />
                )}
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-[13px] leading-relaxed sm:p-5 sm:text-sm">
                <code dangerouslySetInnerHTML={{ __html: html }} />
            </pre>
        </div>
    )
}

export default CodePanel
