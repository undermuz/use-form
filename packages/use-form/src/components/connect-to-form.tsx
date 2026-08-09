import {
    cloneElement,
    type ReactElement,
    type ReactNode,
    useCallback,
    useMemo,
    useState,
    type ChangeEvent,
    type FocusEvent,
} from "react"

import type { FieldName, IError, IValues } from "../useForm/reducer"

import { useFormContext } from "./form-context"

type ConnectToFormSharedProps<
    T extends IValues,
    K extends FieldName<T>
> = {
    id?: string
    name: K
    inputName?: string
    disabled?: boolean
    type?: string
    IsFilled?: (v: T[K]) => boolean
    onRefInput?: (name: K, node: HTMLElement) => void
    onRef?: (name: K, ref: HTMLElement) => void
    hasError?: boolean
    errors?: IError
    isSuccess?: boolean
}

/** Element-child API (props injected via `cloneElement`). */
export type IConnectToFormElement<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
> = ConnectToFormSharedProps<T, K> & {
    children: ReactElement
}

/** Render-prop API — fully typed field props. */
export type IConnectToFormRender<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
> = ConnectToFormSharedProps<T, K> & {
    children: (props: IConnectedProps<T, K>) => ReactNode
}

export type IConnectToForm<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
> = IConnectToFormElement<T, K> | IConnectToFormRender<T, K>

export interface IInputProps {
    id: string
    name: string
    label: string
    disabled: boolean
    value: unknown
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onFocus: (event: FocusEvent<HTMLInputElement>) => void
    onBlur: (event: ChangeEvent<HTMLInputElement>) => void
}

/** Field value type for connected props; `unknown` for the open default form. */
export type ConnectedValue<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
> = unknown extends T[K] ? unknown : T[K]

export interface IConnectedProps<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
> {
    id?: string
    inputProps: IInputProps

    name: string
    value: ConnectedValue<T, K>
    label: string
    errors: IError | null
    disabled: boolean

    isFocused: boolean
    isTouched: boolean
    isFilled: boolean
    isSucceed: boolean
    isDisabled: boolean
    hasError: boolean

    onChange: (value: ConnectedValue<T, K>) => void
    onFocus: () => void
    onBlur: () => void
    onRefInput?: (node: HTMLElement) => void
    onRef?: (ref: HTMLElement) => void
    onError: (error: IError) => void
}

function ConnectToForm<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
>(props: IConnectToFormRender<T, K>): ReactElement | null
function ConnectToForm<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
>(props: IConnectToFormElement<T, K>): ReactElement | null
function ConnectToForm<
    T extends IValues = IValues,
    K extends FieldName<T> = FieldName<T>
>(props: IConnectToForm<T, K>): ReactElement | null {
    const [isFocused, setFocus] = useState(false)

    const {
        IsFilled = Boolean as (v: T[K]) => boolean,
        children,
        name,
        disabled,
        type = "connect-to-form",
        onRefInput: _onRefInput,
        onRef: _onRef,
        id: forceId,
        inputName: forceInputName,
        hasError: forceHasError,
        isSuccess: forceIsSuccess,
        errors: forceErrors,
    } = props

    const params = useFormContext<T>()

    const id =
        typeof forceId !== "undefined" && forceId !== null
            ? forceId
            : `field-${name}`

    const {
        isSending = false,
        values,
        touched = [],
        errors: allErrors,
        fields = {},
        setValue,
        setTouchedByName,
        setCustomErrorByName,
    } = params

    const value = values[name]

    const errors =
        typeof forceErrors !== "undefined" ? forceErrors : allErrors?.[name]

    const childLabel =
        typeof children !== "function"
            ? (children.props as { label?: string } | undefined)?.label
            : undefined

    const label = childLabel || fields[name]
    const inputName = forceInputName || name

    const isTouched = touched.indexOf(name) > -1

    const hasError =
        typeof forceHasError === "boolean"
            ? forceHasError
            : Boolean(errors?.length) && isTouched

    const isFilled = useMemo(() => IsFilled(value), [IsFilled, value])

    const isSucceed =
        typeof forceIsSuccess === "boolean"
            ? forceIsSuccess
            : !hasError && isTouched && isFilled

    const onError = useCallback(
        (error: IError) => {
            setCustomErrorByName(name, error)
        },
        [setCustomErrorByName, name]
    )

    const onRefInput = useMemo(() => {
        if (!_onRefInput) {
            return undefined
        }

        return (node: HTMLElement) => {
            _onRefInput(name, node)
        }
    }, [name, _onRefInput])

    const onRef = useMemo(() => {
        if (_onRef) {
            return (_ref: HTMLElement) => {
                _onRef(name, _ref)
            }
        }
        return undefined
    }, [name, _onRef])

    const onFocus = useCallback(() => {
        setFocus(true)
    }, [])

    const onBlur = useCallback(() => {
        setTouchedByName(name)
        setFocus(false)
    }, [setTouchedByName, name])

    const onChange = useCallback(
        (_v: T[K]) => {
            setValue(name, _v, false, true, type)
        },
        [setValue, name, type]
    )

    const onNativeChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            onChange(e.target.value as T[K])
        },
        [onChange]
    )

    const states = {
        isFocused,
        isTouched,
        isFilled,
        isSucceed,
        isDisabled: isSending || disabled || false,
        hasError,
    }

    const inputProps: IInputProps = {
        id,
        name: inputName,
        label,
        disabled: states.isDisabled,
        value,
        onChange: onNativeChange,
        onFocus,
        onBlur,
    }

    const callbacks = {
        onChange,
        onFocus,
        onBlur,
        onRefInput,
        onRef,
        onError,
    }

    if (!children) {
        console.error("ConnectToForm must have a children")

        return null
    }

    const connectedProps: IConnectedProps<T, K> = {
        id,
        inputProps,

        name: inputProps.name,
        value,
        label: inputProps.label,
        errors: hasError ? errors ?? null : null,
        disabled: inputProps.disabled,

        ...states,

        ...callbacks,
    }

    if (typeof children === "function") {
        return <>{children(connectedProps)}</>
    }

    return cloneElement(children, connectedProps)
}

export { ConnectToForm }
