import {
    type ComponentType,
    type ExoticComponent,
    type JSX,
    type MutableRefObject,
    useEffect,
    useRef,
} from "react"
import { useFormContext } from "../components/form-context"

interface ExoticComponentWithDisplayName<P = unknown>
    extends ExoticComponent<P> {
    defaultProps?: Partial<P>
    displayName?: string
}

type AnyComponent<P = unknown> =
    | ExoticComponentWithDisplayName<P>
    | ComponentType<P>

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

export const useRefBy = <T = unknown>(by: T): MutableRefObject<T> => {
    const refBy = useRef<T>(by)

    useEffect(() => {
        refBy.current = by
    }, [by])

    return refBy
}
