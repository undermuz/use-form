import React from "react"

import {
    useIsFormCanceling,
    useIsFormHasErrors,
    useIsFormSending,
    useIsFormSuccess,
} from "../utils/index"

export interface IIfFormProps {
    children: React.ReactNode
    hasErrors?: boolean
    isCanceling?: boolean
    isSending?: boolean
    isSuccess?: boolean
}

const IfForm: React.FC<IIfFormProps> = (props) => {
    const {
        children,
        isCanceling = false,
        isSending = false,
        isSuccess = false,
        hasErrors,
    } = props

    const isFormHasErrors = useIsFormHasErrors()
    const isFormSuccess = useIsFormSuccess()
    const isFormCanceling = useIsFormCanceling()
    const isFormSending = useIsFormSending()

    if (
        (hasErrors && !isFormHasErrors) ||
        (isSuccess && !isFormSuccess) ||
        (isCanceling && !isFormCanceling) ||
        (isSending && !isFormSending)
    ) {
        return null
    }

    return <>{children}</>
}

export default IfForm
