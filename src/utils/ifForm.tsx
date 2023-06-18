import { type ReactNode } from "react"

import {
    useIsFormCanceling,
    useIsFormSending,
    useIsFormSuccess,
} from "./common"

export interface IIfFormProps {
    children: ReactNode
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
    } = props

    const isFormSuccess = useIsFormSuccess()
    const isFormCanceling = useIsFormCanceling()
    const isFormSending = useIsFormSending()

    if (
        (isSuccess && !isFormSuccess) ||
        (isCanceling && !isFormCanceling) ||
        (isSending && !isFormSending)
    ) {
        return null
    }

    const isDefault = !isCanceling && !isSending && !isSuccess

    if (
        isDefault &&
        (isFormSuccess || isFormCanceling || isFormSending)
    ) {
        return null
    }

    return <>{children}</>
}

export { IfForm }
