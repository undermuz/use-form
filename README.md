# @undermuz/use-form

React library for build forms

## Install

`npm i @undermuz/use-form`

[NPM: @undermuz/use-form](https://www.npmjs.com/package/@undermuz/use-form)

## Update

`npm update @undermuz/use-form`

## Basic usage

[Home page](https://undermuz.github.io/use-form/)

### Setup form

For example, set up a login form with username and password fields and rules.

Rules: for each field, `rules` is an array of `[validators, errorText]`.  
Each validator is `(value, values) => boolean` — the field passes while the function returns `true`.  
One-arg functions and built-in `Boolean` still work. Prefer helpers like `required` / `minLength` when you can.

```ts
import { useForm, required } from "@undermuz/use-form"

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
// form.setValue("username", "alice")
```

Pass the config object into `useForm` directly (or use `satisfies`) so TypeScript can infer value types from `initialValue`. Avoid `const config: IUseFormSettings = { ... }` if you care about inference — that widens field types.

You should wrap your inputs and components that use form hooks with `FormContext.Provider`:

```tsx
    <FormContext.Provider value={form}>
    ...
    </FormContext.Provider>
```

### Connect input-like components to the form

To connect any form component (or just a component)
you have to wrap it by `ConnectToForm` and provide a `name`.

The child should accept a `value` prop and an `onChange` prop, and call `onChange` with the new value.

```tsx
    {/* Element child — props injected via cloneElement (existing API) */}
    <ConnectToForm name="username">
        <FormInput placeholder="Enter your login" />
    </ConnectToForm>

    {/* Typed field name: */}
    <ConnectToForm<LoginForm> name="username">
        <FormInput />
    </ConnectToForm>

    {/* Render prop — fully typed value / onChange for that field */}
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

`ConnectToForm` provides the current field value and waits for a new value through `onChange`.  
Prefer the **render-prop** form when you want TypeScript to know `value` / `onChange` for that field; the element-child form stays supported for existing inputs.

#### Browser's input

```tsx
    type InputProps = Partial<IConnectedProps> & {
        type?: string
        placeholder?: string
    }

    //Short-version
    const FormInputV1: React.FC<InputProps> = ({
        inputProps = {}, //Provides by ConnectToForm
        ...rest
    }) => {
        return (
            <label style={styles}>
                {inputProps.label}:
                <input {..._.pick(rest, ["type", "placeholder"])} {...inputProps} />
            </label>
        )
    }

    //Full-version
    const FormInputV2: React.FC<InputProps> = (props) => {
        const {
            type = "text",
            placeholder = "",
            label, //Provides by ConnectToForm
            name, //Provides by ConnectToForm
            value, //Provides by ConnectToForm
            onChange, //Provides by ConnectToForm
            onBlur, //Provides by ConnectToForm
        } = props

        return (
            <div style={styles}>
                <label htmlFor={name}>{label}:</label>
                <input
                    type={type}
                    id={name}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={(e) => onChange?.(e.target.value)}
                    onBlur={() => onBlur?.()}
                />
            </div>
        )
    }

    ...
    
    <FormContext.Provider value={form}>
        <ConnectToForm name="username">
            <FormInputV1 placeholder="Enter your login" />
        </ConnectToForm>

        <ConnectToForm name="password">
            <FormInputV2
                type="password"
                placeholder="Enter your password"
            />
        </ConnectToForm>
    </FormContext.Provider>
```

#### Ui framework's input

```tsx
    type InputProps = Partial<IConnectedProps> & {
        type?: string
        placeholder?: string
        description?: string
    }

    const FormField: FC<PropsWithChildren<InputProps>> = (props) => {
        const {
            label,
            description = null,
            errors, //Provides by ConnectToForm
            children,
            hasError = false, //Provides by ConnectToForm
        } = props

        return (
            <FormControl isInvalid={hasError}>
                <FormLabel>{label}</FormLabel>

                {children}

                {description !== null && !hasError && (
                    <FormHelperText>{description}</FormHelperText>
                )}

                {errors?.map((errorText, index) => {
                    if (typeof errorText !== "string") {
                        return null
                    }

                    return (
                        <FormErrorMessage key={index}>{errorText}</FormErrorMessage>
                    )
                })}
            </FormControl>
        )
    }

    const FormInput: React.FC<InputProps> = (props) => {
        const {
            type = "text",
            placeholder = "",
            value, //Provides by ConnectToForm
            onChange, //Provides by ConnectToForm
            onBlur, //Provides by ConnectToForm
        } = props

        return (
            <FormField {...props}>
                <Input
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => onChange?.(e.target.value)}
                    onBlur={() => onBlur?.()}
                    value={value}
                />
            </FormField>
        )
    }

    const ErrorBlock = () => {
        const errors = useFormErrors()
        const fields = useFormFields()

        return (
            <>
                {Object.keys(errors).map((name) => (
                    <>
                        <p key={name}>{fields?.[name] || name}:</p>
                        <ul>
                        {errors[name]?.map((error, i) => (
                            <li key={i}>{error as string}</li>
                        ))}
                        </ul>
                    </>
                ))}
            </>
        )
    }

    ...

    <VStack alignItems={"flex-start"}>
        <ConnectToForm name="username">
            <FormInput placeholder="Enter your login" />
        </ConnectToForm>

        <ConnectToForm name="password">
            <FormInput
                type="password"
                placeholder="Enter your password"
            />
        </ConnectToForm>

        <FormSubmit
            as={Button}
            onSend={onSend}
            onSucceed={onSucceed}
        >
            {(status: EnumFormSubmitStatus) => {
                if (status === EnumFormSubmitStatus.Sending) {
                    return "Sending..."
                }

                return "Send"
            }}
        </FormSubmit>

        <IfForm hasErrors>
            <ErrorBlock />
        </IfForm>
    </VStack>
```

#### Third-party components

```tsx
    const formConfig: IUseFormSettings = {
        fields: {
            date: {
                label: "Date picker",
                rules: [[[Boolean], "Date is required"]],
                initialValue: new Date(),
            },
            rangeDates: {
                label: "Date picker: Range",
                rules: [[[Boolean], "Username is required"]],
                initialValue: [new Date(), new Date()],
            },
        },
    }

    const form = useForm(formConfig)
    
    ...

    type InputProps = Partial<IConnectedProps> & {
        type?: string
        placeholder?: string
        description?: string
    }

    const FormField: FC<PropsWithChildren<InputProps>> = (props) => {
        const {
            label,
            description = null,
            errors, //Provides by ConnectToForm
            children,
            hasError = false, //Provides by ConnectToForm
        } = props

        return (
            <FormControl isInvalid={hasError}>
                <FormLabel>{label}</FormLabel>

                {children}

                {description !== null && !hasError && (
                    <FormHelperText>{description}</FormHelperText>
                )}

                {errors?.map((errorText, index) => {
                    if (typeof errorText !== "string") {
                        return null
                    }

                    return (
                        <FormErrorMessage key={index}>{errorText}</FormErrorMessage>
                    )
                })}
            </FormControl>
        )
    }

    const FormDatePicker: React.FC<InputProps & { isRange?: boolean }> = (
        props
    ) => {
        const {
            isRange = false,
            name, //Provides by ConnectToForm
            value, //Provides by ConnectToForm
            onChange, //Provides by ConnectToForm
        } = props

        return (
            <FormField {...props}>
                {!isRange && (
                    <SingleDatepicker
                        name={name}
                        date={value}
                        onDateChange={(date) => onChange?.(date)}
                    />
                )}

                {isRange && (
                    <RangeDatepicker
                        name={name}
                        selectedDates={value}
                        onDateChange={(date) => onChange?.(date)}
                    />
                )}
            </FormField>
        )
    }

    ...

    <ConnectToForm name="date">
        <FormDatePicker />
    </ConnectToForm>

    <ConnectToForm name="rangeDates">
        <FormDatePicker isRange />
    </ConnectToForm>
```

### Input's states

```javascript
    const Input: React.FC<IConnectedProps> = ({
        inputProps = {}, //Provides by ConnectToForm
        label, //Provides by ConnectToForm
        errors, //Provides by ConnectToForm
        isSucceed, //Provides by ConnectToForm
        hasError, //Provides by ConnectToForm
        isFocused, //Provides by ConnectToForm
        isTouched, //Provides by ConnectToForm
        isFilled, //Provides by ConnectToForm
        isDisabled //Provides by ConnectToForm
        ...rest // You've provided
    }) => {
        return (
            <label>
                {label}

                <input
                    {..._.pick(rest, ["type", "placeholder", "etc"])}
                    {...inputProps}
                    className={isSucceed ? "succeed" : hasError ? "has-error" : "default"}
                />

                {/*  Other states */}
                {isFocused && "Tip: type something funny"}
                {isTouched && "You've already touched this field"}
                {isFilled && "You've already filled this field"}
                {isDisabled && "This field is disabled"}

                {/* Field errors */}
                {hasError && <>
                    <span>Errors:</span>
                    <ul>
                        {errors.map((error: string, i: number) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </>}
            </label>
        )
    }
```

### Form's states

```javascript
    <IfForm>
        <p>Show when form is default</p>
    </IfForm>

    <IfForm isSuccess>
        <p>Form has been sent success</p>
    </IfForm>

    <IfForm isCanceling>
        <p>Form has sent unsuccess</p>
    </IfForm>

    <IfForm isSending>
        <p>Form is sending now</p>
    </IfForm>

    <IfForm hasErrors>
        <p>Form has errors</p>
    </IfForm>
```

You can get form's values and errors directly through `form` variable:

```javascript
    const form = useForm(/*Form config*/)

    const { values, errors } = form

    useEffect(() => {
        console.log("[Form][Values]", values)
    }, [values])

    useEffect(() => {
        console.log("[Form][Errors]", errors)
    }, [errors])
```

Or by context inside FormContext.Provider:

```javascript
    const { values, errors } = useFormContext()

    useEffect(() => {
        console.log("[Form][Values]", values)
    }, [values])

    useEffect(() => {
        console.log("[Form][Errors]", errors)
    }, [errors])
```

### Submit

`onSend` receives typed form values. On success, callbacks get `{ response, values }` from `form.send`.

Create callbacks

```ts
    const form = useForm(/*Form config*/)

    ...

    const onSend = useCallback(async (values: typeof form.values) => {
        console.log("Login data", values)

        return sendValuesToTheServer(values)
    }, [])

    const onSucceed = useCallback(
        ({ response, values }: { response: unknown; values: typeof form.values }) => {
            console.log("Login completed", response, values)
        },
        []
    )

    const onError = useCallback((reason: unknown) => {
        console.log("Login failed", reason)
    }, [])

    const submit = useFormSubmit(onSend, onSucceed, onError)
```

Get submit callback by hook

```javascript

    const submit = useFormSubmit(onSend, onSucceed, onError)

    ...

    <Button disabled={form.isSending || form.isCanceling || form.hasErrors} onClick={submit}>
        Submit
    </Button>

```

OR Get submit by component

```javascript
    //Component version

    <FormSubmit onSend={onSend} onSucceed={onSucceed} onError={onError}>
        {(status: EnumFormSubmitStatus) => {
            if (status === EnumFormSubmitStatus.Sending) {
                return "Sending..."
            }

            if (status === EnumFormSubmitStatus.Canceling) {
                return "Failed"
            }

            if (status === EnumFormSubmitStatus.Succeed) {
                return "Succeed"
            }

            return "Submit"
        }}
    </FormSubmit>

```

## TypeScript

`useForm` infers the values type from `fields` / `initialValue`, and threads it through `values`, `setValue`, `setValues`, errors, and touched APIs.

### Infer values from `fields`

```ts
const form = useForm({
    fields: {
        username: { label: "Login", initialValue: "" },
        age: { label: "Age", initialValue: 0 },
    },
})

form.values.username // string
form.values.age // number
form.setValue("age", 21) // ok
// form.setValue("age", "21") // TS error
// form.setValue("missing", "x") // TS error
```

### Explicit values type

Use a generic when `initialValue` is narrower than the real domain (e.g. `null`, but the field is `string | null`):

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

Or widen a single field: `initialValue: null as string | null`.

### Field names

With an inferred or explicit values type, these APIs only accept known field names:

- `setValue` / `setTouchedByName` / `setCustomErrorByName`
- `setTouched` / `setErrors` / `setCustomErrors`
- `ConnectToForm<YourValues> name="..."`

Without a type argument, `ConnectToForm` still accepts any `string` name (React context does not flow generics). Prefer `ConnectToForm<LoginForm>` next to `useForm<LoginForm>`.

For typed `value` / `onChange`, use the render-prop child:

```tsx
<ConnectToForm<LoginForm> name="age">
    {(props) => {
        // props.value: number
        // props.onChange: (value: number) => void
        return <input ... />
    }}
</ConnectToForm>
```

Or type your input as `Partial<IConnectedProps<LoginForm, "username">>`.

### Validators

Runtime always calls `(value, values) => boolean`. Types match that contract.

```ts
import { useForm, required, minLength } from "@undermuz/use-form"

type LoginForm = {
    username: string
    age: number
}

const form = useForm<LoginForm>({
    fields: {
        username: {
            label: "Login",
            initialValue: "",
            rules: [[[required, minLength(3)], "Username is invalid"]],
        },
        age: {
            label: "Age",
            initialValue: 0,
            rules: [[
                [
                    (value, values) =>
                        typeof value === "number" && Boolean(values.username),
                ],
                "Age is invalid",
            ]],
        },
    },
})
```

Built-ins: `required`, `minLength(n)`, `pattern(regexp)`.  
`Boolean` remains valid for simple “truthy” checks.

### Send / FormSubmit

```ts
const result = await form.send(async (values) => {
    return { token: "…" } // values typed from the form
})

result.values // form values
result.response.token // string

<FormSubmit
    onSend={async (values) => api.login(values)}
    onSucceed={({ response, values }) => {
        /* response + values typed */
    }}
    onError={(err) => {
        /* FormValidateError | FormSendError | unknown */
    }}
/>
```

Types: `FormSendApi`, `FormSendResult`, `FormSubmitError`, `IFormSubmitProps`.

### Form options

```ts
const form = useForm({
    fields: { /* ... */ },
    options: {
        debug: true,
        afterSendDelay: 300,
        mapServerFields: { user_name: "username" },
        middlewares: [myMiddleware], // FormMiddleware[]
    },
})
```

| Option | Purpose |
|--------|---------|
| `debug` | Extra console logs |
| `afterSendDelay` | How long success/cancel flags stay true after send |
| `mapServerFields` | Map API field names → local names when applying `__meta__.formInfo.fieldsErrors` |
| `middlewares` | Extra store middlewares (`FormMiddleware` / `StoreMiddleware`) |

### Errors helpers

`IError` can nest maps; UI usually wants plain strings:

```ts
import { getFieldError, getFieldErrorMessages } from "@undermuz/use-form"

getFieldError(form.errors, "username") // string[]
getFieldErrorMessages(form.errors.username)

form.sendError // unknown | null — last send failure payload
```

### Tips

| Do | Avoid |
|----|--------|
| Pass config inline into `useForm({ fields })` | `const config: IUseFormSettings = { ... }` if you need inference |
| Set `initialValue` for typed values | Omitting `initialValue` → field value typed as `unknown` |
| `useForm<MyValues>(...)` for unions / nullables | Relying only on `null` literal inference |
| `ConnectToForm<MyValues> name="..."` | Untyped `ConnectToForm` when you want name checks |

## Controlled form

You can control form values from outside by providing `value` and `onChange` to `useForm`'s config.

```ts
import { useState } from "react"
import { useForm, required } from "@undermuz/use-form"

type LoginForm = {
    username: string
    password: string
}

const [value, onChange] = useState<LoginForm>({
    username: "",
    password: "",
})

const form = useForm<LoginForm>({
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
    value,
    onChange,
})
```

You can get *more* control

```javascript
/*
    FORM_ACTIONS = {
        SET_VALUES
        SET_VALUE
        SET_TESTS
        SET_TOUCHED_FIELD
        SET_TOUCHED
        SET_ERRORS
        SET_FIELDS
        SET_VALIDATE
        SET_IS_SENDING
        SET_IS_CANCELING
        SET_IS_SUCCESS
        SET_SEND_ERROR
        VALIDATE_FORM
        SEND_FORM
    }
*/

const [formConfig, formState] = useFormCoreParams({
    fields: {
        username: {
            label: "Login",
            rules: [[[Boolean], "Username is required"]],
        },
        password: {
            label: "Password",
            rules: [[[Boolean], "Password is required"]],
        },
    },
    options: {
        middlewares: [
            /* --> */createYourCustomMiddleware()/* <-- */
        ]
    }
})

const form = useFormCore(formConfig, formState)

const setValue = useCallback((values: any) => {
    if (isDebug) console.log("[useCustomForm][setValue]", values)

    formState.dispatch({
        type: FORM_ACTIONS.SET_VALUES,
        payload: {
            values,
            /* --> */yourCustomPayload: "some-additional-info"/* <-- */
        },
    })
}, [])
```

You can get even *more* control

```javascript
    const useCustomFormState = (props: IFormConfig): FormState => {
        const initialState = useMemo(() => getInitialState(props), [])

        const middlewares = useMemo(
            () => [
                ...(props?.middlewares || []),

                /* --> */YOUR_CUSTOM_MIDDLEWARE(props)/* <-- */,

                /*  You can remove default middlewares: */
                //createValidating(props),
                //createSend(props),
            ],
            []
        )

        const [state, dispatch, store] = useReducer<IFormState>(
            formReducer,
            initialState,
            middlewares
        )

        return { state, dispatch, store }
    }

    const useCustomFormParams = (
        formSettings: IUseFormSettings
    ): [IFormConfig, FormState] => {
        const formConfig = useFormConfigBySettings(formSettings)
        const formState = useCustomFormState(formConfig)

        return [formConfig, formState]
    }

    ...
        const [formConfig, formState] = useCustomFormParams({
            fields: {
                username: {
                    label: "Login",
                    rules: [[[Boolean], "Username is required"]],
                },
                password: {
                    label: "Password",
                    rules: [[[Boolean], "Password is required"]],
                },
            }
        })

        const form = useFormCore(formConfig, formState)
    ...
```

## Examples

```tsx
import { useCallback } from "react"
import {
    useForm,
    FormContext,
    ConnectToForm,
    FormSubmit,
    IfForm,
    useFormErrors,
    useFormFields,
    required,
    EnumFormSubmitStatus,
    type IConnectedProps,
} from "@undermuz/use-form"

const Input: React.FC<IConnectedProps & { type?: string; placeholder?: string }> = ({
    type = "text",
    placeholder = "",
    onChange,
    label,
    value,
}) => {
    return (
        <>
            <label>{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                onChange={(e) => onChange?.(e.target.value)}
                value={value}
            />
        </>
    )
}

const ErrorBlock = () => {
    const errors = useFormErrors()
    const fields = useFormFields()

    return (
        <>
            {Object.keys(errors).map((name) => (
                <div key={name}>
                    <p>{fields?.[name] || name}:</p>
                    <ul>
                        {errors[name]?.map((error, i) => (
                            <li key={i}>{error as string}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </>
    )
}

const LoginForm = () => {
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

    const onSend = useCallback((values: typeof form.values) => {
        console.log("Login data", values)
    }, [])

    const onSucceed = useCallback(() => {
        console.log("Login completed")
    }, [])

    return (
        <FormContext.Provider value={form}>
            <ConnectToForm name="username">
                <Input placeholder="Enter your login" />
            </ConnectToForm>

            <ConnectToForm name="password">
                <Input type="password" placeholder="Enter your password" />
            </ConnectToForm>

            <FormSubmit onSend={onSend} onSucceed={onSucceed}>
                {(status: EnumFormSubmitStatus) => {
                    if (status === EnumFormSubmitStatus.Sending) {
                        return "Sending..."
                    }

                    return "Send"
                }}
            </FormSubmit>

            <IfForm hasErrors>
                <ErrorBlock />
            </IfForm>
        </FormContext.Provider>
    )
}
```
