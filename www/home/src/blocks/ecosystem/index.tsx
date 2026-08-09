import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"

export type EcosystemLink = {
    id: number
    name: string
    description: string
    href: string
}

export type EcosystemValue = {
    title: string
    body: string
    links: EcosystemLink[]
}

const DEF_VALUE: EcosystemValue = {
    title: "Around the form",
    body: "use-form is the validation core. Higher-level packages build schemes and pages on top of it.",
    links: [
        {
            id: 1,
            name: "GitHub · use-form",
            description: "Source, issues, and releases.",
            href: "https://github.com/undermuz/use-form",
        },
        {
            id: 2,
            name: "npm · @undermuz/use-form",
            description: "Install from the registry.",
            href: "https://www.npmjs.com/package/@undermuz/use-form",
        },
        {
            id: 3,
            name: "@undermuz/react-json-form",
            description:
                "JSON schemes → generated edit forms that run on use-form.",
            href: "https://www.npmjs.com/package/@undermuz/react-json-form",
        },
        {
            id: 4,
            name: "@undermuz/react-page-builder",
            description:
                "Compose pages from blocks; edit dialogs use react-json-form.",
            href: "https://www.npmjs.com/package/@undermuz/react-page-builder",
        },
    ],
}

const scheme: IScheme = {
    id: "ecosystem",
    title: "Ecosystem",
    multiple: false,
    scheme: [
        {
            name: "title",
            title: "Title",
            type: EnumSchemeItemType.Text,
            def_value: DEF_VALUE.title,
        },
        {
            name: "body",
            title: "Body",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.body,
        },
        {
            name: "links",
            title: "Links",
            type: EnumSchemeItemType.Widget,
            multiple: true,
            scheme: [
                {
                    name: "name",
                    title: "Name",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
                {
                    name: "description",
                    title: "Description",
                    type: EnumSchemeItemType.TextBlock,
                    def_value: "",
                },
                {
                    name: "href",
                    title: "URL",
                    type: EnumSchemeItemType.Text,
                    def_value: "",
                },
            ],
        },
    ],
}

const EcosystemView: FC<{ id?: number; value?: EcosystemValue }> = ({
    value,
}) => {
    const v = {
        ...DEF_VALUE,
        ...value,
        links: value?.links?.length ? value.links : DEF_VALUE.links,
    }

    return (
        <section className="w-full px-4 pb-20 pt-12 sm:px-6 sm:pb-24 sm:pt-16">
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-uf-secondary">
                    Ecosystem
                </p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-uf-muted">
                    {v.body}
                </p>
                <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                    {v.links.map((link, index) => (
                        <li key={`${link.name}-${index}`}>
                            <a
                                href={link.href}
                                target={
                                    link.href.startsWith("http")
                                        ? "_blank"
                                        : undefined
                                }
                                rel={
                                    link.href.startsWith("http")
                                        ? "noreferrer"
                                        : undefined
                                }
                                className="glass glass-hover flex h-full flex-col rounded-2xl p-5 transition"
                            >
                                <p className="font-semibold text-uf-text">
                                    {link.name}
                                </p>
                                <p className="mt-2 font-mono text-sm leading-relaxed text-uf-muted">
                                    {link.description}
                                </p>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

const EcosystemBlock: IBlock<EcosystemValue> = {
    id: "ecosystem",
    title: "Ecosystem",
    description: "Related packages and links",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: EcosystemView,
}

export default EcosystemBlock
