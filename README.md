# @undermuz/use-form

React library for build forms

See src/examples for more details

## Install

`npm i -S git@github.com:undermuz/use-form.git`

## Update

`npm update @undermuz/use-form`


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
    const formConfig = useMemo<IUseFormOptions>(() => {
        return {
            initialValues: {
                username: "",
                password: "",
            },
            valueTests: [
                [
                    ["username", "password"],
                    [Boolean],
                    "Username and password are required",
                ],
            ],
            fields: {
                username: "Login",
                password: "Password",
            },
        }
    }, [])

    const form = useForm(formConfig)

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

            <IfForm>
                <ErrorBlock />
            </IfForm>
        </FormContext.Provider>
    )
}
```
