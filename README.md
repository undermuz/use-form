# @undermuz/use-form

Type-safe React forms: values, field names, validators, and submit — inferred from your field config.

**Current release:** `2.0.0-alpha` (breaking type improvements vs 1.x).

[Demo & docs site](https://undermuz.github.io/use-form/) · [npm](https://www.npmjs.com/package/@undermuz/use-form)

## Install

```bash
npm i @undermuz/use-form
```

Peer deps: `react` / `react-dom` ≥ 17.

## Quick start

```tsx
import { useCallback } from "react"
import {
    useForm,
    FormContext,
    ConnectToForm,
    FormSubmit,
    IfForm,
    required,
    EnumFormSubmitStatus,
    getFieldErrorMessages,
    useFormErrors,
} from "@undermuz/use-form"

function LoginForm() {
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

    // form.values.username // string

    const onSend = useCallback(async (values: typeof form.values) => {
        return api.login(values)
    }, [])

    return (
        <FormContext.Provider value={form}>
            <ConnectToForm name="username">
                {(props) => (
                    <label>
                        {props.label}
                        <input
                            value={props.value}
                            onChange={(e) => props.onChange(e.target.value)}
                            onBlur={props.onBlur}
                        />
                    </label>
                )}
            </ConnectToForm>

            <ConnectToForm name="password">
                {(props) => (
                    <label>
                        {props.label}
                        <input
                            type="password"
                            value={props.value}
                            onChange={(e) => props.onChange(e.target.value)}
                            onBlur={props.onBlur}
                        />
                    </label>
                )}
            </ConnectToForm>

            <FormSubmit
                onSend={onSend}
                onSucceed={({ response, values }) => {
                    console.log("ok", response, values)
                }}
            >
                {(status) =>
                    status === EnumFormSubmitStatus.Sending ? "Sending…" : "Send"
                }
            </FormSubmit>

            <IfForm hasErrors>
                <Errors />
            </IfForm>
        </FormContext.Provider>
    )
}

function Errors() {
    const errors = useFormErrors()
    return (
        <ul>
            {Object.entries(errors).flatMap(([name, fieldErrors]) =>
                getFieldErrorMessages(fieldErrors).map((msg) => (
                    <li key={`${name}-${msg}`}>
                        {name}: {msg}
                    </li>
                ))
            )}
        </ul>
    )
}
```

Wrap anything that uses form hooks / `ConnectToForm` / `FormSubmit` in `FormContext.Provider`.

---

## TypeScript

### Infer values from `fields`

Pass the config **inline** (or use `satisfies`) so `initialValue` types are kept:

```ts
const form = useForm({
    fields: {
        username: { label: "Login", initialValue: "" },
        age: { label: "Age", initialValue: 0 },
    },
})

form.values.username // string
form.setValue("age", 21) // ok
// form.setValue("age", "21") // error
// form.setValue("missing", "x") // error
```

Avoid `const config: IUseFormSettings = { … }` if you need inference — that widens field types.

### Explicit values type

When `initialValue` is narrower than the real domain:

```ts
type LoginForm = {
    username: string | null
    age: number
}

const form = useForm<LoginForm>({
    fields: {
        username: { label: "Login", initialValue: null },
        age: { label: "Age", initialValue: 0 },
    },
})

form.setValue("username", "alice") // ok
form.setValue("username", null) // ok
```

Or per field: `initialValue: null as string | null`.

### Field names

Typed against your values shape:

- `setValue` / `setTouchedByName` / `setCustomErrorByName`
- `setTouched` / `setErrors` / `setCustomErrors`
- `ConnectToForm<LoginForm> name="…"`
- `getFieldError(errors, name)`

### Validators

Runtime calls `(value, values) => boolean`. One-arg functions and `Boolean` still work.

```ts
import { useForm, required, minLength } from "@undermuz/use-form"

rules: [[[required, minLength(3)], "Username is invalid"]]

// Cross-field:
rules: [[
    [(value, values) => typeof value === "number" && Boolean(values.username)],
    "Invalid age",
]]
```

Built-ins: `required`, `minLength(n)`, `pattern(regexp)`.

### Send / submit

```ts
const { response, values } = await form.send(async (v) => api.login(v))

<FormSubmit
    onSend={async (values) => api.login(values)}
    onSucceed={({ response, values }) => { /* typed */ }}
    onError={(err) => { /* FormValidateError | FormSendError | unknown */ }}
/>
```

Or `useFormSubmit(onSend, onSucceed, onError)` for a click handler.

### Options

```ts
useForm({
    fields: { /* … */ },
    options: {
        debug: true,
        afterSendDelay: 300,
        mapServerFields: { user_name: "username" },
        middlewares: [myMiddleware],
    },
})
```

| Option | Purpose |
|--------|---------|
| `debug` | Extra console logs |
| `afterSendDelay` | How long success/cancel flags stay true |
| `mapServerFields` | Map API field names → local names for `__meta__.formInfo.fieldsErrors` |
| `middlewares` | Extra `FormMiddleware` / `StoreMiddleware` |

### Errors helpers

```ts
import { getFieldError, getFieldErrorMessages } from "@undermuz/use-form"

getFieldError(form.errors, "username") // string[]
getFieldErrorMessages(form.errors.username)

form.sendError // unknown | null
```

### Tips

| Do | Avoid |
|----|--------|
| Inline `useForm({ fields })` or `satisfies` | `const c: IUseFormSettings = …` when you need inference |
| Set `initialValue` for typed values | Omitting it → `unknown` |
| `useForm<MyValues>(…)` for nullables/unions | Relying on `null` alone |
| Render-prop `ConnectToForm` for typed `value` | Untyped element children when you need field types |

---

## ConnectToForm

### Render prop (recommended for TS)

```tsx
<ConnectToForm<LoginForm> name="username">
    {(props) => (
        <input
            value={props.value ?? ""}
            onChange={(e) => props.onChange(e.target.value)}
            onBlur={props.onBlur}
        />
    )}
</ConnectToForm>
```

`props` includes: `value`, `onChange`, `onBlur`, `label`, `errors`, `hasError`, `isTouched`, `isFilled`, `isSucceed`, `inputProps`, …

### Element child (cloneElement)

Still supported — injects the same props into a single React element:

```tsx
<ConnectToForm name="username">
    <MyInput placeholder="Login" />
</ConnectToForm>
```

Type the child as `Partial<IConnectedProps<LoginForm, "username">>` when you want strict props.

### With a UI kit

Same pattern: wrap your design-system input and forward `value` / `onChange` / `onBlur` / `hasError` / `errors`.

---

## Controlled form

```ts
const [value, onChange] = useState({ username: "", password: "" })

const form = useForm({
    fields: {
        username: { label: "Login", initialValue: "", rules: [[[required], "Required"]] },
        password: { label: "Password", initialValue: "", rules: [[[required], "Required"]] },
    },
    value,
    onChange,
})
```

---

## Form UI helpers

```tsx
<IfForm>…</IfForm>
<IfForm isSending>…</IfForm>
<IfForm isSuccess>…</IfForm>
<IfForm isCanceling>…</IfForm>
<IfForm hasErrors>…</IfForm>

useIsFormSending()
useIsFormSuccess()
useIsFormCanceling()
useIsFormHasErrors()
useFormErrors()
useFormFields()
useFormContext<MyValues>()
```

---

## Advanced

Custom store middleware / low-level core:

```ts
const [formConfig, formState] = useFormCoreParams({
    fields: { /* … */ },
    options: {
        middlewares: [createYourCustomMiddleware()],
    },
})

const form = useFormCore(formConfig, formState)

formState.dispatch({
    type: FORM_ACTIONS.SET_VALUES,
    payload: { values: { username: "a" } },
})
```

See `FORM_ACTIONS` and `FormMiddleware` in the package types for the full action surface.

---

## Migration from 1.x

- Prefer `initialValue` + inferred/`useForm<T>` types instead of untyped `IValues`
- Validators are `(value, values) => boolean` (one-arg still OK)
- Use `required` / `minLength` / `pattern` instead of only `Boolean`
- `options` is a closed shape (`debug`, `afterSendDelay`, `mapServerFields`, `middlewares`)
- `ConnectToForm` render-prop for typed field values
- `getFieldError` for UI error lists
- `form.send` / `FormSubmit` resolve to `{ response, values }`

---

## Workspace

This repo is an npm workspaces + Nx monorepo:

| Path | Package |
|------|---------|
| `packages/use-form` | `@undermuz/use-form` library |
| `www/home` | Marketing / demo site |

```bash
npm run lint
npm run test
npm run build
npm run dev:home
```
