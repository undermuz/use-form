import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"

export type HeroValue = {
    brand: string
    eyebrow: string
    headline: string
    support: string
    primaryLabel: string
    primaryHref: string
    secondaryLabel: string
    secondaryHref: string
    flowConnect: string
    flowValidate: string
    flowSubmit: string
}

const DEF_VALUE: HeroValue = {
    brand: "@undermuz/use-form",
    eyebrow: "Hook-first forms for React",
    headline: "Own your inputs. Keep the state, validation, and submit.",
    support:
        "A typed form hook that wires any UI — plain inputs, design-system fields, or custom widgets — without locking you into a component kit.",
    primaryLabel: "Install →",
    primaryHref: "#install",
    secondaryLabel: "Try the demo",
    secondaryHref: "#demo",
    flowConnect: "Connect",
    flowValidate: "Validate",
    flowSubmit: "Submit",
}

const scheme: IScheme = {
    id: "hero",
    title: "Hero",
    multiple: false,
    scheme: [
        {
            name: "brand",
            title: "Brand",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.brand,
        },
        {
            name: "eyebrow",
            title: "Eyebrow",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.eyebrow,
        },
        {
            name: "headline",
            title: "Headline",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.headline,
        },
        {
            name: "support",
            title: "Support",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.support,
        },
        {
            name: "primaryLabel",
            title: "Primary CTA label",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.primaryLabel,
        },
        {
            name: "primaryHref",
            title: "Primary CTA href",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.primaryHref,
        },
        {
            name: "secondaryLabel",
            title: "Secondary CTA label",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.secondaryLabel,
        },
        {
            name: "secondaryHref",
            title: "Secondary CTA href",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.secondaryHref,
        },
        {
            name: "flowConnect",
            title: "Flow: Connect",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.flowConnect,
        },
        {
            name: "flowValidate",
            title: "Flow: Validate",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.flowValidate,
        },
        {
            name: "flowSubmit",
            title: "Flow: Submit",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.flowSubmit,
        },
    ],
}

const FlowStep: FC<{ label: string; index: number }> = ({ label, index }) => (
    <div className="flex items-center gap-2">
        <span className="flex size-7 items-center justify-center rounded-lg border border-uf-primary/40 bg-uf-primary/15 font-mono text-[11px] font-semibold text-uf-secondary">
            {index}
        </span>
        <span className="font-mono text-sm font-medium text-uf-text">
            {label}
        </span>
    </div>
)

const HeroFlow: FC<{
    connect: string
    validate: string
    submit: string
}> = ({ connect, validate, submit }) => (
    <aside
        className="hero-flow relative w-full max-w-sm shrink-0"
        aria-label="Form lifecycle"
    >
        <div className="glass relative overflow-hidden rounded-2xl border-uf-primary/35 p-5 shadow-[0_0_40px_rgb(95_160_78_/0.18)] sm:p-6">
            <div className="absolute -right-8 -top-8 size-28 rounded-full bg-uf-primary/15 blur-2xl" />
            <p className="relative font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-uf-secondary">
                Lifecycle
            </p>
            <div className="relative mt-4 space-y-3">
                <FlowStep label={connect} index={1} />
                <div
                    className="ml-3.5 h-4 w-px bg-gradient-to-b from-uf-primary/60 to-uf-border"
                    aria-hidden
                />
                <FlowStep label={validate} index={2} />
                <div
                    className="ml-3.5 h-4 w-px bg-gradient-to-b from-uf-primary/60 to-uf-border"
                    aria-hidden
                />
                <FlowStep label={submit} index={3} />
            </div>
            <p className="relative mt-5 font-mono text-xs leading-relaxed text-uf-muted">
                Same hook for login, settings, and multi-step flows — UI stays
                yours.
            </p>
        </div>
    </aside>
)

const HeroView: FC<{ id?: number; value?: HeroValue }> = ({ value }) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section className="relative w-full overflow-hidden px-4 pb-16 pt-14 sm:px-6 sm:pb-20 sm:pt-20">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(95_160_78_/0.16),transparent_55%)]" />
            <div className="relative mx-auto max-w-6xl">
                <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-12">
                    <div className="animate-rise min-w-0">
                        <p className="mb-4 font-mono text-xs font-medium uppercase tracking-[0.18em] text-uf-secondary">
                            {v.eyebrow}
                        </p>
                        <h1 className="text-balance font-sans text-4xl font-semibold tracking-tight text-uf-text sm:text-5xl md:text-6xl">
                            {v.brand}
                        </h1>
                        <p className="mt-5 max-w-2xl text-balance font-sans text-xl font-medium leading-snug tracking-tight text-uf-text/90 sm:text-2xl md:text-[1.75rem]">
                            {v.headline}
                        </p>
                        <div className="mt-8 flex flex-wrap gap-3">
                            <a
                                href={v.primaryHref}
                                className="inline-flex items-center rounded-lg border border-uf-primary bg-uf-primary/15 px-5 py-2.5 text-sm font-medium text-uf-text transition hover:bg-uf-primary/25"
                            >
                                {v.primaryLabel}
                            </a>
                            <a
                                href={v.secondaryHref}
                                target={
                                    v.secondaryHref.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    v.secondaryHref.startsWith("http")
                                        ? "noreferrer"
                                        : undefined
                                }
                                className="inline-flex items-center rounded-lg border border-uf-border bg-uf-elevated/80 px-5 py-2.5 text-sm font-medium text-uf-text transition hover:border-uf-secondary/40"
                            >
                                {v.secondaryLabel}
                            </a>
                        </div>
                    </div>

                    <HeroFlow
                        connect={v.flowConnect}
                        validate={v.flowValidate}
                        submit={v.flowSubmit}
                    />
                </div>

                <p className="animate-rise-delay mt-10 max-w-3xl border-l-2 border-uf-primary/50 pl-4 font-mono text-sm leading-relaxed text-uf-muted sm:text-[15px]">
                    {v.support}
                </p>
            </div>
        </section>
    )
}

const HeroBlock: IBlock<HeroValue> = {
    id: "hero",
    title: "Hero",
    description: "Brand-first hero with Connect → Validate → Submit flow",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: HeroView,
}

export default HeroBlock
