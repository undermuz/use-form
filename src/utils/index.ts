import { type MutableRefObject, useCallback, useEffect, useRef } from "react"
import { useFormContext } from "../connectToForm/formContext"

interface ExoticComponentWithDisplayName<P = unknown>
    extends React.ExoticComponent<P> {
    defaultProps?: Partial<P>
    displayName?: string
}

type AnyComponent<P = any> =
    | ExoticComponentWithDisplayName<P>
    | React.ComponentType<P>

type KnownWebTarget = keyof JSX.IntrinsicElements | AnyComponent

export type WebTarget =
    | string // allow custom elements, etc.
    | KnownWebTarget

export const useIsFormSuccess = () => {
    const params = useFormContext()

    return params.isSuccess
}

export const useIsFormCanceling = () => {
    const params = useFormContext()

    return params.isCanceling
}

export const useIsFormSending = () => {
    const params = useFormContext()

    return params.isSending
}

export const useIsFormHasErrors = () => {
    const params = useFormContext()

    return Object.keys(params.errors).length > 0
}

export const useFormFields = () => {
    const params = useFormContext()

    return params.fields
}

export const useFormErrors = () => {
    const params = useFormContext()

    return params.errors
}

export const useFormSubmit = (
    onSend: Function,
    onSucceed: (value: any) => any,
    onError?: (reason: any) => any
) => {
    const { send } = useFormContext()

    const handleSave = useCallback(() => {
        send(onSend).then<any, any>(onSucceed, onError)
    }, [send, onSend, onSucceed, onError])

    return handleSave
}

export const useRefBy = <T = any>(by: T): MutableRefObject<T> => {
    const refBy = useRef<T>(by)

    useEffect(() => {
        refBy.current = by
    }, [by])

    return refBy
}
