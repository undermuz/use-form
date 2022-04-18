import {
    cloneElement,
    ReactElement,
    useCallback,
    useMemo,
    useState,
} from "react"
import { useFormContext } from "./formContext"

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

const ConnectToForm = (props: IConnectToForm) => {
    const [focus, setFocus] = useState(false)

    const {
        IsFilled = Boolean,
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
        errors = [],
        fields = {},
        setValue,
        setTouchedByName,
    } = params

    const value = values[name]
    const error = errors[name]
    const isTouched = touched.indexOf(name) > -1
    const isFilled = IsFilled(value)
    const isError = Boolean(error) && isTouched
    const isSuccess = !isError && isTouched && IsFilled(value)

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

    if (!props.children) {
        console.error("ConnectToForm must have a children")

        return null
    }

    return cloneElement(props.children, {
        name: inputName || name,
        value,
        label: props.children?.props?.label || fields[name],
        focused: focus,
        touched: isTouched,
        filled: isFilled,
        disabled: isSending || disabled,
        isError,
        isSuccess,
        error: isError ? error : false,
        success: isSuccess,

        onChange,
        onFocus,
        onBlur,
        onRefInput,
        onRef,
    })
}

export default ConnectToForm
