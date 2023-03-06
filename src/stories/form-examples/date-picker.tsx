import { type FC, useCallback, type PropsWithChildren } from "react"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus as style } from "react-syntax-highlighter/dist/esm/styles/prism"

import { RangeDatepicker, SingleDatepicker } from "chakra-dayzed-datepicker"

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
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    VStack,
} from "@chakra-ui/react"

import BaseStoryLayout from "../base"

const Code1 = `
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
    <VStack alignItems={"flex-start"}>
        <ConnectToForm name="date">
            <FormDatePicker />
        </ConnectToForm>

        <ConnectToForm name="rangeDates">
            <FormDatePicker isRange />
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
            isChakra
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
                <VStack alignItems={"flex-start"}>
                    <ConnectToForm name="date">
                        <FormDatePicker />
                    </ConnectToForm>

                    <ConnectToForm name="rangeDates">
                        <FormDatePicker isRange />
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
            </FormContext.Provider>
        </BaseStoryLayout>
    )
}

export default BaseExampleForm
