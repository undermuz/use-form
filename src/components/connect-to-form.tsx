import {
    cloneElement,
    type ReactElement,
    useCallback,
    useMemo,
    useState,
    type ChangeEvent,
    type FocusEvent,
} from "react"
import type { IError } from "../useForm/reducer"
import { useFormContext } from "./form-context"

export interface IConnectToForm {
    id?: string
    name: string
    inputName?: string
    disabled?: boolean
    type?: string
    children: ReactElement
    IsFilled?: (v: any) => boolean
    onRefInput?: Function
    onRef?: Function
    hasError?: boolean
    isSuccess?: boolean
}

export interface IInputProps {
    id: string
    name: string
    label: string
    disabled: boolean
    value: any
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
    onFocus: (event: FocusEvent<HTMLInputElement>) => void
    onBlur: (event: ChangeEvent<HTMLInputElement>) => void
}

export interface IConnectedProps {
    id?: string
    inputProps: IInputProps

    name: string
    value: any
    label: string
    errors: IError | null
    disabled: boolean

    isFocused: boolean
    isTouched: boolean
    isFilled: boolean
    isSucceed: boolean
    isDisabled: boolean
    hasError: boolean

    onChange: Function
    onFocus: Function
    onBlur: Function
    onRefInput?: Function
    onRef?: Function
    onError: Function
}

const ConnectToForm = (props: IConnectToForm) => {
    const [isFocused, setFocus] = useState(false)

    const {
        IsFilled = Boolean,
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
    } = props

    const params = useFormContext()

    const id =
        typeof forceId !== "undefined" && forceId !== null
            ? forceId
            : `field-${name}`

    const {
        isSending = false,
        values = {},
        touched = [],
        errors: allErrors = {},
        fields = {},
        setValue,
        setTouchedByName,
        setCustomErrorByName,
    } = params

    const value = values[name]
    const errors = allErrors[name]
    const label = children?.props?.label || fields[name]
    const inputName = forceInputName || name

    const isTouched = touched.indexOf(name) > -1

    const hasError =
        typeof forceHasError === "boolean"
            ? forceHasError
            : Boolean(errors) && errors?.length > 0 && isTouched

    const isFilled = IsFilled(value)

    const isSucceed =
        typeof forceIsSuccess === "boolean"
            ? forceIsSuccess
            : !hasError && isTouched && IsFilled(value)

    const onError = useCallback(
        (error: IError) => {
            setCustomErrorByName(name, error)
        },
        [setCustomErrorByName, name]
    )

    const onRefInput = useMemo(() => {
        if (_onRefInput) {
            return (node: HTMLElement) => {
                _onRefInput(name, node)
            }
        }
        return undefined
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
    }, [setTouchedByName])

    const onChange = useCallback(
        (_v: any) => {
            setValue(name, _v, false, true, type)
        },
        [setValue, name, type]
    )

    const onNativeChange = useCallback(
        (e: any) => onChange?.(e?.target?.value),
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

    const connectedProps: IConnectedProps = {
        id,
        inputProps,

        name: inputProps.name,
        value: inputProps.value,
        label: inputProps.label,
        errors: hasError ? errors : null,
        disabled: inputProps.disabled,

        ...states,

        ...callbacks,
    }

    return cloneElement(children, connectedProps)
}

export { ConnectToForm }
