import type { FC } from "react"

export type AppMode = "edit" | "view"

type ModeToggleProps = {
    mode: AppMode
    onChange: (mode: AppMode) => void
}

const ModeToggle: FC<ModeToggleProps> = ({ mode, onChange }) => {
    return (
        <div
            role="group"
            aria-label="Page mode"
            className="inline-flex rounded-full border border-uf-border bg-uf-elevated/80 p-1 backdrop-blur-md"
        >
            {(["view", "edit"] as const).map((item) => {
                const active = mode === item
                return (
                    <button
                        key={item}
                        type="button"
                        onClick={() => onChange(item)}
                        className={[
                            "rounded-full px-4 py-1.5 font-mono text-xs font-medium uppercase tracking-wide transition-all duration-200",
                            active
                                ? "bg-uf-primary text-white shadow-[0_0_24px_rgb(95_160_78_/0.4)]"
                                : "text-uf-muted hover:text-uf-text",
                        ].join(" ")}
                    >
                        {item}
                    </button>
                )
            })}
        </div>
    )
}

export default ModeToggle
