import React from "react"

import IfForm from "../ifForm"

import {
    useFormSubmit,
    useIsFormHasErrors,
    useIsFormSending,
    WebTarget,
} from "../utils"

export enum EnumFormSubmitStatus {
    Default = "default",
    Succeed = "succeed",
    Canceling = "canceling",
    Sending = "sending",
}

interface IFormSubmitProps<Target = WebTarget> {
    as: Target
    children?: (status: EnumFormSubmitStatus) => React.ReactNode
    disableWhenErrors?: boolean
    onSend: Function
    onFinally: (value: any) => any
    onError?: (reason: any) => PromiseLike<never>
    disabled?: boolean
}

const FormSubmit: React.FC<IFormSubmitProps> = (props) => {
    const {
        as: Component = "button",
        children,
        disableWhenErrors = false,
        onSend,
        onFinally,
        onError,
        disabled = false,
        ...otherProps
    } = props

    const hasErrors = useIsFormHasErrors()
    const isSending = useIsFormSending()

    const submit = useFormSubmit(onSend, onFinally, onError)

    return (
        <Component
            {...otherProps}
            disabled={isSending || (hasErrors && disableWhenErrors) || disabled}
            type="submit"
            onClick={submit}
        >
            <IfForm>
                {children ? children(EnumFormSubmitStatus.Default) : "Send"}
            </IfForm>

            <IfForm isSuccess>
                {children ? children(EnumFormSubmitStatus.Succeed) : "Succeed"}
            </IfForm>

            <IfForm isCanceling>
                {children ? children(EnumFormSubmitStatus.Canceling) : "Failed"}
            </IfForm>

            <IfForm isSending>
                {children
                    ? children(EnumFormSubmitStatus.Sending)
                    : "Sending..."}
            </IfForm>
        </Component>
    )
}

export default FormSubmit
