import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"

export type HighlightItem = {
    id: number
    title: string
    description: string
}

export type HighlightsValue = {
    title: string
    subtitle: string
    items: HighlightItem[]
    cardOneTitle: string
    cardOneBody: string
    cardTwoTitle: string
    cardTwoBody: string
}

const DEF_VALUE: HighlightsValue = {
    title: "Why teams pick use-form",
    subtitle:
        "A small form engine: typed values, rules you control, and UI that stays yours.",
    items: [
        {
            id: 1,
            title: "UI you already have",
            description:
                "No locked field kit. Wire plain inputs, Chakra, HeroUI, or custom widgets.",
        },
        {
            id: 2,
            title: "ConnectToForm",
            description:
                "CloneElement children or typed render props — value, onChange, onBlur injected.",
        },
        {
            id: 3,
            title: "Rules that compose",
            description:
                "(value, values) => boolean validators — built-ins plus custom cross-field checks.",
        },
        {
            id: 4,
            title: "Submit with status",
            description:
                "FormSubmit and IfForm expose sending / success / error without extra state glue.",
        },
        {
            id: 5,
            title: "Typed from the start",
            description:
                "Infer field types from initialValue — keep autocomplete without widening casts.",
        },
        {
            id: 6,
            title: "Controlled when you need it",
            description:
                "Pass value / onChange for controlled forms, or let the hook own state.",
        },
    ],
    cardOneTitle: "Design-system inputs",
    cardOneBody:
        "Keep your component library. use-form only owns values, touched, errors, and submit.",
    cardTwoTitle: "Login & settings",
    cardTwoBody:
        "Ship forms without adopting a full UI framework or rewriting every field wrapper.",
}

const scheme: IScheme = {
    id: "highlights",
    title: "Highlights",
    multiple: false,
    scheme: [
        {
            name: "title",
            title: "Title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
        },
        {
            name: "subtitle",
            title: "Subtitle",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.subtitle,
        },
        {
            name: "items",
            title: "Features",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            scheme: [
                {
                    name: "title",
                    title: "Title",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
                {
                    name: "description",
                    title: "Description",
                    type: EnumSchemeItemType.TextBlock,
                    def_value: "",
                },
            ],
        },
        {
            name: "cardOneTitle",
            title: "Use case 1 title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardOneTitle,
        },
        {
            name: "cardOneBody",
            title: "Use case 1 body",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardOneBody,
        },
        {
            name: "cardTwoTitle",
            title: "Use case 2 title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardTwoTitle,
        },
        {
            name: "cardTwoBody",
            title: "Use case 2 body",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.cardTwoBody,
        },
    ],
}

const HighlightsView: FC<{ id?: number; value?: HighlightsValue }> = ({
    value,
}) => {
    const v = {
        ...DEF_VALUE,
        ...value,
        items: value?.items?.length ? value.items : DEF_VALUE.items,
    }

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                <div className="max-w-2xl">
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-uf-secondary">
                        Offer
                    </p>
                    <h2 className="mt-3 font-sans text-3xl font-semibold tracking-tight sm:text-4xl">
                        {v.title}
                    </h2>
                    <p className="mt-4 font-mono text-sm leading-relaxed text-uf-muted">
                        {v.subtitle}
                    </p>
                </div>

                <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {v.items.map((item, index) => (
                        <li
                            key={`${item.title}-${index}`}
                            className="glass glass-hover rounded-2xl p-5"
                        >
                            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-uf-secondary">
                                {String(index + 1).padStart(2, "0")}
                            </p>
                            <p className="mt-3 font-semibold text-uf-text">
                                {item.title}
                            </p>
                            <p className="mt-2 font-mono text-sm leading-relaxed text-uf-muted">
                                {item.description}
                            </p>
                        </li>
                    ))}
                </ul>

                <div className="mt-6 grid gap-0 overflow-hidden rounded-2xl border border-uf-border bg-uf-elevated/50 sm:grid-cols-2">
                    <article className="border-b border-uf-border px-6 py-6 sm:border-b-0 sm:border-r sm:px-8 sm:py-7">
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-uf-secondary">
                            Use case
                        </p>
                        <p className="mt-2 text-lg font-semibold text-uf-text">
                            {v.cardOneTitle}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-uf-muted">
                            {v.cardOneBody}
                        </p>
                    </article>
                    <article className="px-6 py-6 sm:px-8 sm:py-7">
                        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-uf-muted">
                            Use case
                        </p>
                        <p className="mt-2 text-lg font-semibold text-uf-text">
                            {v.cardTwoTitle}
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-uf-muted">
                            {v.cardTwoBody}
                        </p>
                    </article>
                </div>
            </div>
        </section>
    )
}

const HighlightsBlock: IBlock<HighlightsValue> = {
    id: "highlights",
    title: "Highlights",
    description: "Offer: feature tiles + use-case band",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: HighlightsView,
}

export default HighlightsBlock
