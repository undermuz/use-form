import type { FC } from "react"
import { EnumSchemeItemType } from "@undermuz/react-json-form"
import type { IScheme } from "@undermuz/react-json-form"
import type { IBlock } from "@undermuz/react-page-builder"
import CodePanel from "../../components/CodePanel"

export type UsageValue = {
    title: string
    body: string
    code: string
}

const DEF_VALUE: UsageValue = {
    title: "Minimal form in a few lines",
    body: "Configure fields, wrap with FormContext, connect inputs, submit. TypeScript infers values from initialValue.",
    code: `import {
  useForm,
  FormContext,
  ConnectToForm,
  FormSubmit,
  required,
} from "@undermuz/use-form"

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

export function LoginForm() {
  return (
    <FormContext.Provider value={form}>
      <ConnectToForm name="username">
        {(props) => (
          <input
            value={props.value ?? ""}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlur}
          />
        )}
      </ConnectToForm>

      <ConnectToForm name="password">
        {(props) => (
          <input
            type="password"
            value={props.value ?? ""}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlur}
          />
        )}
      </ConnectToForm>

      <FormSubmit
        onSend={async (values) => values}
        onSucceed={() => console.log("ok")}
      >
        {(status) => (status === "sending" ? "Sending…" : "Send")}
      </FormSubmit>
    </FormContext.Provider>
  )
}`,
}

const scheme: IScheme = {
    id: "usage",
    title: "Usage",
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

const UsageView: FC<{ id?: number; value?: UsageValue }> = ({ value }) => {
    const v = { ...DEF_VALUE, ...value }

    return (
        <section className="w-full px-4 py-12 sm:px-6 sm:py-16">
            <div className="mx-auto max-w-6xl">
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-uf-secondary">
                    How
                </p>
                <h2 className="mt-2 font-sans text-2xl font-semibold tracking-tight sm:text-3xl">
                    {v.title}
                </h2>
                <p className="mt-3 max-w-3xl font-mono text-sm leading-relaxed text-uf-muted">
                    {v.body}
                </p>
                <div className="mt-8">
                    <CodePanel filename="LoginForm.tsx" code={v.code} copyable />
                </div>
            </div>
        </section>
    )
}

const UsageBlock: IBlock<UsageValue> = {
    id: "usage",
    title: "Usage",
    description: "Minimal useForm code sample",
    image: "",
    value: DEF_VALUE,
    scheme,
    view: UsageView,
}

export default UsageBlock
