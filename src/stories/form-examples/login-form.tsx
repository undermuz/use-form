import { type FC, useCallback, type PropsWithChildren } from "react"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"

import ConnectToForm, {
    type IConnectedProps,
} from "../../components/connect-to-form"
import FormContext from "../../components/form-context"
import FormSubmit, { EnumFormSubmitStatus } from "../../components/form-submit"
import { type IValues } from "../../useForm/reducer"
import useForm, { type IUseFormSettings } from "../../useForm/useForm"
import { useFormErrors, useFormFields } from "../../utils/common"
import IfForm from "../../utils/ifForm"

import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input,
} from "@chakra-ui/react"

import BaseStoryLayout from "../base"

const Code1 = `
const form = useForm(formConfig)

const onSend = useCallback((values: IValues) => {
    console.log("Login data", values)
}, [])

const onSucceed = useCallback(() => {
    console.log("Login completed")
}, [])
`

const Code2 = `
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

const Code3 = `
type InputProps = Partial<IConnectedProps> & {
    type?: string
    placeholder?: string
    description?: string
}

const FormField: FC<PropsWithChildren<InputProps>> = (props) => {
    const {
        label,
        description = null,
        errors,
        children,
        hasError = false,
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
    const { type = "text", placeholder = "", value, onChange, onBlur } = props

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
    <ConnectToForm name="username">
        <FormInput placeholder="Enter your login" />
    </ConnectToForm>

    <ConnectToForm name="password">
        <FormInput
            type="password"
            placeholder="Enter your password"
        />
    </ConnectToForm>

    <FormSubmit as={Button} onSend={onSend} onSucceed={onSucceed}>
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
`

type InputProps = Partial<IConnectedProps> & {
    type?: string
    placeholder?: string
    description?: string
}

const FormField: FC<PropsWithChildren<InputProps>> = (props) => {
    const {
        label,
        description = null,
        errors,
        children,
        hasError = false,
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
    const { type = "text", placeholder = "", value, onChange, onBlur } = props

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
                        {Code2}
                    </SyntaxHighlighter>
                    <SyntaxHighlighter language="jsx" style={style}>
                        {Code3}
                    </SyntaxHighlighter>
                </>
            }
        >
            <FormContext.Provider value={form}>
                <ConnectToForm name="username">
                    <FormInput placeholder="Enter your login" />
                </ConnectToForm>

                <ConnectToForm name="password">
                    <FormInput
                        type="password"
                        placeholder="Enter your password"
                    />
                </ConnectToForm>

                <FormSubmit as={Button} onSend={onSend} onSucceed={onSucceed}>
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
        </BaseStoryLayout>
    )
}

export default BaseExampleForm
