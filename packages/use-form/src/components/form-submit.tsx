import type { ElementType, ReactNode } from "react"

import { IfForm } from "../utils/ifForm"

import {
    useIsFormHasErrors,
    useIsFormSending,
    type WebTarget,
} from "../utils/common"

import {
    useFormSubmit,
    type FormSubmitError,
} from "../utils/useFormSubmit"
import type {
    FormSendApi,
    FormSendResult,
} from "../useForm/useFormControl"
import type { IValues } from "../useForm/reducer"

export enum EnumFormSubmitStatus {
    Default = "default",
    Succeed = "succeed",
    Canceling = "canceling",
    Sending = "sending",
}

export interface IFormSubmitProps<
    T extends IValues = IValues,
    R = unknown,
    Target = WebTarget
> {
    as?: Target
    children?: (status: EnumFormSubmitStatus) => ReactNode
    disableWhenErrors?: boolean
    onSend: FormSendApi<T, R>
    onSucceed: (result: FormSendResult<T, R>) => void
    onError?: (reason: FormSubmitError) => void
    disabled?: boolean
}

function FormSubmit<T extends IValues = IValues, R = unknown>(
    props: IFormSubmitProps<T, R>
) {
    const {
        as: ComponentProp = "button",
        children,
        disableWhenErrors = false,
        onSend,
        onSucceed,
        onError,
        disabled = false,
        ...otherProps
    } = props

    const Component = ComponentProp as ElementType
    const hasErrors = useIsFormHasErrors()
    const isSending = useIsFormSending()

    const submit = useFormSubmit(onSend, onSucceed, onError)

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

export { FormSubmit }
