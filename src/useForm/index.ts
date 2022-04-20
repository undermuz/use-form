import { useCallback, useMemo } from "react"

import formReducer, {
    EnumFormStatus,
    IErrors,
    IFields,
    IFormState,
    ITouched,
    IValues,
    IValueTest,
    SEND_FORM,
    ValidateFunction,
} from "./reducer"

/* MIDDLEWARES */
import createValidating from "./middlewares/validate"
import createSend from "./middlewares/send"

/* HELPERS */
import {
    useIsFormValid,
    useSetTouched,
    useSetValues,
    useSetTests,
    useSetFieldValue,
    useSetFieldTouched,
    useSetValidate,
    useSetErrors,
} from "./helpers"

import useReducer, { DispatchFunction, IStore } from "../useReducer/index"

export interface IInitialStateOptions {
    initialValues: IValues
    valueTests: IValueTest[]
    fields: IFields
    validate?: Function
}

const DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: () => {},
}

export const getInitialState = (
    props: IInitialStateOptions = DEF_INITIAL_STATE_OPTIONS
): IFormState => {
    const {
        initialValues = {},
        valueTests = [],
        fields = {},
        validate: _validate,
    } = props

    return {
        status: EnumFormStatus.Initial,
        isSending: false,
        isCanceling: false,
        isSuccess: false,
        sendError: null,
        values: initialValues,
        tests: valueTests,
        validate: _validate,
        touched: [],
        fields,
        errors: {},
    }
}

export interface IUseFormOptions extends IInitialStateOptions {
    middlewares?: any[]
}

export interface IUseFormControl {
    setValue: (
        name: string,
        value: any,
        silent?: boolean,
        checkOnlyFilled?: boolean,
        type?: string
    ) => void
    setTouchedByName: (name: string, value?: boolean, silent?: boolean) => void
    setTouched: (
        newTouched: ITouched,
        silent?: boolean,
        checkOnlyFilled?: boolean
    ) => void
    setValues: (
        newValues: IValues,
        silent?: boolean,
        checkOnlyFilled?: boolean,
        type?: string
    ) => void
    setTests: (
        newTests: IValueTest[],
        silent?: boolean,
        checkOnlyFilled?: boolean
    ) => void
    setValidate: (
        newValidate: ValidateFunction,
        silent?: boolean,
        checkOnlyFilled?: boolean
    ) => void
    setErrors: (newErrors: IErrors) => void
}

export const useFormControl = (
    props: IUseFormOptions,
    store: IStore<IFormState>,
    dispatch: DispatchFunction
): IUseFormControl => {
    const setTouched = useSetTouched(props, store, dispatch)
    const setValues = useSetValues(props, store, dispatch)
    const setTests = useSetTests(props, store, dispatch)
    const setValidate = useSetValidate(props, store, dispatch)
    const setErrors = useSetErrors(props, store, dispatch)
    const setValue = useSetFieldValue(props, store, dispatch)
    const setTouchedByName = useSetFieldTouched(props, store, dispatch)

    return {
        setValue,
        setTouchedByName,
        setTouched,
        setValues,
        setTests,
        setValidate,
        setErrors,
    }
}

export type SendFunction = (api: Function) => Promise<any>

export interface IUseForm {
    IsFormValid: (c: boolean) => boolean
    store: IStore<IFormState>
    dispatch: DispatchFunction
    send: SendFunction
}

export type UseFormConfig = IUseForm & IFormState & IUseFormControl

const useFormCore = (props: IUseFormOptions): UseFormConfig => {
    const initialState = useMemo(() => getInitialState(props), [])

    const middlewares = useMemo(
        () => [
            ...(props?.middlewares || []),
            createValidating(props),
            createSend(props),
        ],
        []
    )

    const [state, dispatch, store] = useReducer<IFormState>(
        formReducer,
        initialState,
        middlewares
    )

    const formControl = useFormControl(props, store, dispatch)

    const IsFormValid = useIsFormValid(props, store, dispatch)

    const send = useCallback<SendFunction>((api: Function) => {
        return new Promise((onResolve, onReject) => {
            dispatch({
                type: SEND_FORM,
                payload: {
                    api,
                    onResolve,
                    onReject,
                },
            })
        })
    }, [])

    return {
        ...state,
        ...formControl,
        IsFormValid,

        store,
        dispatch,

        send,
    }
}

export type IUseFormFieldRule = [Array<Function>, string?]
export interface IUseFormField {
    label: string
    initialValue?: string
    rules?: IUseFormFieldRule[]
}

export type TypeUseFormField = IUseFormField | string

export interface IUseFormSettings {
    fields: Record<string, TypeUseFormField>
    options?: IUseFormOptions
}

const useForm = (props: IUseFormSettings) => {
    const formConfig = useMemo<IUseFormOptions>(() => {
        const _config = {
            initialValues: {},
            valueTests: [],
            fields: {},
            ...(props.options || {}),
        }

        Object.keys(props.fields).forEach((fieldName: string) => {
            const _field: TypeUseFormField = props.fields[fieldName]

            let field: IUseFormField

            if (typeof _field === "string") {
                field = {
                    label: _field as string,
                }
            } else {
                field = _field as IUseFormField
            }

            _config.fields[fieldName] = field.label || fieldName
            _config.initialValues[fieldName] = field.initialValue

            if (field.rules) {
                field.rules.forEach((rule: IUseFormFieldRule) => {
                    _config.valueTests.push([[fieldName], ...rule])
                })
            }
        })

        return _config
    }, [])

    return useFormCore(formConfig)
}

export default useForm
