import { type FC, useCallback } from "react"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"
import _ from "underscore"

import ConnectToForm, {
    type IConnectedProps,
} from "../../components/connect-to-form"
import FormContext from "../../components/form-context"
import FormSubmit, { EnumFormSubmitStatus } from "../../components/form-submit"
import { type IValues } from "../../useForm/reducer"
import useForm, { type IUseFormSettings } from "../../useForm/useForm"
import { useFormErrors, useFormFields } from "../../utils/common"
import IfForm from "../../utils/ifForm"

import BaseStoryLayout from "../base"

const Code1 = `
const formConfig: IUseFormSettings = {
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
}
`

const Code2 = `
const form = useForm(formConfig)

const onSend = useCallback((values: IValues) => {
    console.log("Login data", values)
}, [])

const onSucceed = useCallback(() => {
    console.log("Login completed")
}, [])
`

const Code3 = `
const styles: React.CSSProperties = { display: "flex", flexDirection: "column" }

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

const ErrorBlock = () => {
    const errors = useFormErrors()
    const fields = useFormFields()

    return (
        <>
            {Object.keys(errors).map((name) => (
                <>
                    <p key={name}>{fields?.[name] || name}:</p>
                    <ul>
                        {errors[name].map((error, i) => (
                            <li key={i}>{error as string}</li>
                        ))}
                    </ul>
                </>
            ))}
        </>
    )
}

...

<FormContext.Provider value={form}>
    <div style={styles}>
        <ConnectToForm name="username">
            <FormInputV1 placeholder="Enter your login" />
        </ConnectToForm>

        <ConnectToForm name="password">
            <FormInputV2
                type="password"
                placeholder="Enter your password"
            />
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
    </div>
</FormContext.Provider>
`

const styles: React.CSSProperties = { display: "flex", flexDirection: "column" }

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

const ErrorBlock = () => {
    const errors = useFormErrors()
    const fields = useFormFields()

    return (
        <>
            {Object.keys(errors).map((name) => (
                <>
                    <p key={name}>{fields?.[name] || name}:</p>
                    <ul>
                        {errors[name].map((error, i) => (
                            <li key={i}>{error as string}</li>
                        ))}
                    </ul>
                </>
            ))}
        </>
    )
}

const formConfig: IUseFormSettings = {
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
}

const BaseExampleForm: FC = () => {
    const form = useForm(formConfig)

    const onSend = useCallback((values: IValues) => {
        console.log("Login data", values)
    }, [])

    const onSucceed = useCallback(() => {
        console.log("Login completed")
    }, [])

    return (
        <BaseStoryLayout
            left={
                <>
                    <SyntaxHighlighter language="jsx" style={style}>
                        {Code1}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="jsx" style={style}>
                        {Code2}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="jsx" style={style}>
                        {`//console.log(form.value)\n${JSON.stringify(
                            form.values,
                            null,
                            2
                        )}`}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="jsx" style={style}>
                        {`//console.log(form.errors)\n${JSON.stringify(
                            form.errors,
                            null,
                            2
                        )}`}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="jsx" style={style}>
                        {Code3}
                    </SyntaxHighlighter>
                </>
            }
        >
            <FormContext.Provider value={form}>
                <div style={styles}>
                    <ConnectToForm name="username">
                        <FormInputV1 placeholder="Enter your login" />
                    </ConnectToForm>

                    <ConnectToForm name="password">
                        <FormInputV2
                            type="password"
                            placeholder="Enter your password"
                        />
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
                </div>
            </FormContext.Provider>
        </BaseStoryLayout>
    )
}

export default BaseExampleForm
