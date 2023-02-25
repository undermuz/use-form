import {
    cloneElement,
    type ReactElement,
    useCallback,
    useMemo,
    useState,
} from "react"
import type { IError } from "../useForm/reducer"
import { useFormContext } from "./form-context"

export interface IConnectToForm {
    name: string
    inputName?: string
    disabled?: boolean
    type?: string
    children: ReactElement
    IsFilled?: (v: any) => boolean
    onRefInput?: Function
    onRef?: Function
}

export interface IInputProps {
    id: string
    name: string
    label: string
    disabled: boolean
    value: any
    onChange: Function
    onFocus: Function
    onBlur: Function
}

export interface IConnectedProps {
    inputProps: IInputProps

    name: string
    value: string
    label: string
    error: IError | null
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
}

const ConnectToForm = (props: IConnectToForm) => {
    const [isFocused, setFocus] = useState(false)

    const {
        IsFilled = Boolean,
        children,
        name,
        inputName,
        disabled,
        type = "connect-to-form",
        onRefInput: _onRefInput,
        onRef: _onRef,
    } = props

    const params = useFormContext()

    const {
        isSending = false,
        values = {},
        touched = [],
        errors = {},
        fields = {},
        setValue,
        setTouchedByName,
    } = params

    const value = values[name]
    const error = errors[name]

    const isTouched = touched.indexOf(name) > -1

    const hasError = Boolean(error) && isTouched

    const isFilled = IsFilled(value)
    const isSucceed = !hasError && isTouched && IsFilled(value)

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

    const inputProps: IInputProps = {
        id: `field-${name}`,
        name: inputName || name,
        label: children?.props?.label || fields[name],
        disabled: isSending || disabled || false,
        value,
        onChange: (e: any) => onChange?.(e?.target?.value),
        onFocus,
        onBlur,
    }

    if (!children) {
        console.error("ConnectToForm must have a children")

        return null
    }

    const connectedProps: IConnectedProps = {
        inputProps,

        name: inputProps.name,
        value: inputProps.value,
        label: inputProps.label,
        error: hasError ? error : null,
        disabled: inputProps.disabled,

        isFocused,
        isTouched,
        isFilled,
        isSucceed,
        isDisabled: inputProps.disabled,
        hasError,

        onChange,
        onFocus,
        onBlur,
        onRefInput,
        onRef,
    }

    return cloneElement(children, connectedProps)
}

export default ConnectToForm
