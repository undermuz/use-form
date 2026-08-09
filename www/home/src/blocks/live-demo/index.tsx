import { useCallback, type ComponentProps, type FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import {
    ConnectToForm,
    FormContext,
    FormSubmit,
    EnumFormSubmitStatus,
    IfForm,
    required,
    useForm,
    useFormErrors,
    type IValues,
} from "@undermuz/use-form"
import CodePanel from "../../components/CodePanel"

const DemoSubmitButton = (props: ComponentProps<"button">) => (
    <button {...props} className="uf-demo-btn" />
)

export type LiveDemoValue = {
    title: string
    body: string
}

const DEF_VALUE: LiveDemoValue = {
    title: "Fill it — watch values & errors",
    body: "A live login form powered by @undermuz/use-form. Blur empty fields or hit Send to see validation; the panels update as you type.",
}

const scheme: IScheme = {
    id: "live-demo",
    title: "Live demo",
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
    ],
}

const DemoField: FC<{
    name: "username" | "password"
    type?: string
    placeholder: string
}> = ({ name, type = "text", placeholder }) => (
    <ConnectToForm name={name}>
        {(props) => (
            <label className="flex flex-col gap-1.5">
                <span className="font-mono text-xs text-uf-muted">
                    {props.label ?? name}
                </span>
                <input
                    className="uf-demo-input"
                    type={type}
                    name={props.name}
                    value={String(props.value ?? "")}
                    placeholder={placeholder}
                    onChange={(e) => props.onChange(e.target.value)}
                    onBlur={props.onBlur}
                />
            </label>
        )}
    </ConnectToForm>
)

const ErrorList: FC = () => {
    const errors = useFormErrors()
    const names = Object.keys(errors)
    if (!names.length) return null

    return (
        <ul className="mt-3 space-y-1 font-mono text-xs text-red-400">
            {names.map((name) =>
                (errors[name] ?? []).map((msg, i) => (
                    <li key={`${name}-${i}`}>
                        {name}: {String(msg)}
                    </li>
                )),
            )}
        </ul>
    )
}

const LiveLoginDemo: FC = () => {
    const form = useForm({
        fields: {
            username: {
                label: "Login",
                initialValue: "",
                rules: [[[required], "Username is required"]],
            },
            password: {
                label: "Password",
                initialValue: "",
                rules: [[[required], "Password is required"]],
            },
        },
    })

    const onSend = useCallback(async (values: IValues) => {
        await new Promise((r) => setTimeout(r, 600))
        return values
    }, [])

    const onSucceed = useCallback(() => {
        // demo only
    }, [])

    return (
        <FormContext.Provider value={form}>
            <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
                <div className="glass rounded-2xl p-5 sm:p-6">
                    <form
                        className="flex flex-col gap-4"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <DemoField name="username" placeholder="alice" />
                        <DemoField
                            name="password"
                            type="password"
                            placeholder="••••••••"
                        />
                        <FormSubmit
                            as={DemoSubmitButton}
                            onSend={onSend}
                            onSucceed={onSucceed}
                        >
                            {(status) => {
                                if (status === EnumFormSubmitStatus.Sending) {
                                    return "Sending…"
                                }
                                if (status === EnumFormSubmitStatus.Succeed) {
                                    return "Succeed"
                                }
                                return "Send"
                            }}
                        </FormSubmit>
                        <IfForm hasErrors>
                            <ErrorList />
                        </IfForm>
                    </form>
                </div>
                <div className="grid gap-4">
                    <CodePanel
                        filename="values.json"
                        language="json"
                        code={JSON.stringify(form.values, null, 2)}
                    />
                    <CodePanel
                        filename="errors.json"
                        language="json"
                        code={JSON.stringify(form.errors, null, 2)}
                    />
                </div>
            </div>
        </FormContext.Provider>
    )
}

const LiveDemoView: FC<{ id?: number; value?: LiveDemoValue }> = ({
    value,
}) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section
            id="demo"
            className="scroll-mt-28 w-full px-4 py-12 sm:px-6 sm:py-16"
        >
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-uf-secondary">
                    Interactive
                </p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-uf-muted">
                    {v.body}
                </p>
                <div className="mt-8">
                    <LiveLoginDemo />
                </div>
            </div>
        </section>
    )
}

const LiveDemoBlock: IBlock<LiveDemoValue> = {
    id: "live-demo",
    title: "Live demo",
    description: "Interactive useForm login demo",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: LiveDemoView,
}

export default LiveDemoBlock
