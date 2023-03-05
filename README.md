# @undermuz/use-form

React library for build forms

## Install

`npm i @undermuz/use-form`

## Update

`npm update @undermuz/use-form`

## Basic usage

[Storybook](https://undermuz.github.io/use-form/)

### Setup form

For example, setup a login form with username and password fields with rules
Rules work like: `!yourFn(filedValue) && errorText`, your should provide an array: `[Rule1, Rule2, RuleN]`
Every rule is array: `[yourFnArray, errorText]`, yourFnArray is array of functions: `yourFn(filedValue: unknown) => boolean`

This example uses built-in JS function `Boolean` to validate input's values

```javascript
    const form = useForm({
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
    })
```

You should wrapp your inputs and components witch use form-hooks by FormContext.Provider

```javascript
    <FormContext.Provider value={form}>
    ...
    </FormContext.Provider>
```

### Connect input-like components to the form

To connect any form component (or just a component)
you have to wrapp it by ConnectToForm and provider a name

Provided component have to receive `value` prop and `onChange` prop and emit `onChange` with new value

```javascript
    <ConnectToForm name="FIELD_NAME">
        {/*Your component*/}
    </ConnectToForm>
```

ConnectToForm provides current field's value to your component, and wait new value through `onChange`

#### Browser's input

```javascript

    //Short-version
    const Input: React.FC<IConnectedProps> = ({
        inputProps = {}, //Provides by ConnectToForm
        ...rest
    }) => {
        return (
            <label>
                {inputProps.label}
                <input
                    {..._.pick(rest, ["type", "placeholder"])}
                    {...inputProps}
                />
            </label>
        )
    }

    //Full-version
    const Input: React.FC<IConnectedProps> = ({
        type = "text",
        placeholder = "",
        name = "", //Provides by ConnectToForm
        onChange, //Provides by ConnectToForm
        label, //Provides by ConnectToForm
        value, //Provides by ConnectToForm
    }) => {
        return (
            <label>
                {label}
                <input
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    onChange={(e) => onChange?.(e.target.value)}
                    value={value}
                />
            </label>
        )
    }

    ...

    <ConnectToForm name="username">
        <Input type="text" />
    </ConnectToForm>

    <ConnectToForm name="password">
        <Input type="password" />
    </ConnectToForm>
```

#### Third-party components

```javascript
    const form = useForm({
        fields: {
            date: {
                label: "Start date",
                initialValue: new Date(),
                rules: [
                    [[Boolean], "Start date is required"],
                    [[SomeDateValidationFunction], "Start date is invalid"]
                ],
            },
        },
    })
    
    ...

    const DateInput: React.FC<IConnectedProps> = ({
        label, //Provides by ConnectToForm
        value, //Provides by ConnectToForm
        onChange, //Provides by ConnectToForm
        ...rest
    }) => {
        return (
            <label>
                {label}
                <DateTime
                    {...rest}
                    value={fromDate(value)}
                    onChange={(m) => onChange(m.toDate())}
                />
            </label>
        )
    }

    ...

    <ConnectToForm name="date">
        <DateInput dateFormat={"YYYY-MM-DD"} />
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

Create callbacks

```javascript
    const form = useForm(/*Form config*/)

    ...

    const onSend = useCallback(async (values: IValues) => {
        console.log("Login data", values)

        await sendValuesToTheServer(values)
    }, [])

    const onSucceed = useCallback(() => {
        console.log("Login completed")
    }, [])

    const onError = useCallback(() => {
        console.log("Login failed")
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

## Controlled form

You can control form's values from outside by providing `value` and `onChange` to useForm's config

```javascript
const [value, onChange] = useState<IValues>(() => {
    return {
        username: "",
        password: ""
    }
})

const form = useForm({
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
    value,
    onChange
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

```javascript
const Input: React.FC<IConnectedProps> = ({
    type = "text",
    placeholder = "",
    onChange,
    label,
    value,
}) => {
    return (
        <>
            <label>{label}</label>
            <InputGroup fullWidth size="Small">
                <input
                    type={type}
                    placeholder={placeholder}
                    onChange={(e) => onChange?.(e.target.value)}
                    value={value}
                />
            </InputGroup>
        </>
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
                        {errors[name].map((error: string, i: number) => (
                            <li key={i}>{error}</li>
                        ))}
                    </ul>
                </>
            ))}
        </>
    )
}

const LoginForm = () => {
    const form = useForm({
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
    })

    const onSend = useCallback((values: IValues) => {
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
