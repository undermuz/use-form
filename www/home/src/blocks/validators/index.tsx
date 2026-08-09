import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import CodePanel from "../../components/CodePanel"

export type ValidatorsValue = {
    title: string
    body: string
    code: string
}

const DEF_VALUE: ValidatorsValue = {
    title: "Built-in validators + custom rules",
    body: "Use required, minLength, and pattern — or any (value, values) => boolean. Pair each validator with an error message in the rules tuple.",
    code: `import { required, minLength, pattern } from "@undermuz/use-form"

const emailOk = (value: string) =>
  /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(value)

const form = useForm({
  fields: {
    email: {
      label: "Email",
      initialValue: "",
      rules: [
        [[required], "Email is required"],
        [[emailOk], "Enter a valid email"],
      ],
    },
    password: {
      label: "Password",
      initialValue: "",
      rules: [
        [[required], "Password is required"],
        [[minLength(8)], "At least 8 characters"],
        [[pattern(/[A-Z]/)], "Need an uppercase letter"],
      ],
    },
  },
})`,
}

const scheme: IScheme = {
    id: "validators",
    title: "Validators",
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
            name: "code",
            title: "Code",
            type: EnumSchemeItemType.TextBlock,
            def_value: DEF_VALUE.code,
        },
    ],
}

const ValidatorsView: FC<{ id?: number; value?: ValidatorsValue }> = ({
    value,
}) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto grid max-w-6xl items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                <div>
                    <p className="font-mono text-xs uppercase tracking-[0.16em] text-uf-secondary">
                        Validation
                    </p>
                    <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                        {v.title}
                    </h2>
                    <p className="mt-3 font-mono text-sm leading-relaxed text-uf-muted">
                        {v.body}
                    </p>
                    <ul className="mt-6 space-y-2 font-mono text-sm text-uf-muted">
                        <li className="flex gap-2">
                            <span className="text-uf-secondary">✓</span>
                            <span>
                                <code className="text-uf-text">required</code> —
                                non-empty values
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-uf-secondary">✓</span>
                            <span>
                                <code className="text-uf-text">minLength(n)</code>{" "}
                                — length checks
                            </span>
                        </li>
                        <li className="flex gap-2">
                            <span className="text-uf-secondary">✓</span>
                            <span>
                                <code className="text-uf-text">pattern(re)</code>{" "}
                                — RegExp matches
                            </span>
                        </li>
                    </ul>
                </div>
                <CodePanel filename="validators.ts" code={v.code} copyable />
            </div>
        </section>
    )
}

const ValidatorsBlock: IBlock<ValidatorsValue> = {
    id: "validators",
    title: "Validators",
    description: "Built-in and custom validation rules",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: ValidatorsView,
}

export default ValidatorsBlock
