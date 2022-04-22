# @undermuz/use-form

React library for build forms

## Install

`npm i -S git@github.com:undermuz/use-form.git`

## Update

`npm update @undermuz/use-form`

## Basic usage

### Setup form

For example, setup a login form with username and password fields with rules
Rules work like: !yourFn(filedValue) && errorText, your should provide an array: [Rule1, Rule2, RuleN]
Every rule is array: [yourFnList, errorText], yourFnList is array of functions: yourFn(filedValue) => boolean

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
    const Input: React.FC<IInputProps> = ({
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
    const Input: React.FC<IInputProps> = ({
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

    const DateInput: React.FC<IInputProps> = ({
        onChange, //Provides by ConnectToForm
        label, //Provides by ConnectToForm
        value, //Provides by ConnectToForm
        ...rest
    }) => {
        return (
            <label>
                {label}
                <DateTime
                    {...rest}
                    value={moment(value)}
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
    const Input: React.FC<IInputProps> = ({
        inputProps = {}, //Provides by ConnectToForm
        label, //Provides by ConnectToForm
        isSucceed, //Provides by ConnectToForm
        hasError, //Provides by ConnectToForm
        isFocused, //Provides by ConnectToForm
        isTouched, //Provides by ConnectToForm
        isFilled, //Provides by ConnectToForm
        isDisabled //Provides by ConnectToForm
        ...rest
    }) => {
        return (
            <label>
                {label}
                <input
                    {..._.pick(rest, ["type", "placeholder"])}
                    {...inputProps}
                    className={isSucceed ? "succeed" : hasError ? "has-error" : "default"}
                />
                {/*  Other states */}
                {isFocused && "Tip: type something funny"}
                {isTouched && "You have already touched this field"}
                {isFilled && "You have already filled this field"}
                {isDisabled && "This field is disabled now"}
            </label>
        )
    }
```

### Form's states

```javascript
    <IfForm>
        <p>Nothing happens</p>
    </IfForm>

    <IfForm isSuccess>
        <p>Form has sent success</p>
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

### Submit

#### Create callbacks

```javascript
    const form = useForm(/*Form config*/)

    ...

    const onSend = useCallback(async (values: IValues) => {
        console.log("Login data", values)

        await sendValuesToTheServer(value)

        return true
    }, [])

    const onSucceed = useCallback(() => {
        console.log("Login completed")
    }, [])

    const onError = useCallback(() => {
        console.log("Login failed")
    }, [])
```

#### Get submit callback by hook

```javascript

    const submit = useFormSubmit(onSend, onSucceed, onError)

    ...

    <Button disabled={form.isSending} onClick={submit}>
        Submit
    </Button>

```

#### OR Get submit by component

```javascript
    //Component version

    <FormSubmit onSend={onSend} onSucceed={onSucceed} onError={onError}>
        {(status: EnumFormSubmitStatus) => {
            if (status === EnumFormSubmitStatus.Sending) {
                return "Sending..."
            }

            return "Submit"
        }}
    </FormSubmit>

```

## Examples

```javascript
const Input: React.FC<IInputProps> = ({
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
                <Input />
            </ConnectToForm>

            <ConnectToForm name="password">
                <Input />
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
