import { useCallback, useEffect, useMemo, useRef } from "react"

import formReducer, {
    EnumFormStatus,
    type IErrors,
    type IFields,
    type IFormState,
    type ITouched,
    type IValues,
    type IValueTest,
    SEND_FORM,
    type ValidateFunction,
} from "./reducer"

/* MIDDLEWARES */
import createValidating, { getFormErrors } from "./middlewares/validate"
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

import { isEqual } from "underscore"

import useReducer, {
    type DispatchFunction,
    type IStore,
} from "../useReducer/index"
import { useRefBy } from "../utils/index"

export interface IInitialStateOptions {
    initialValues: IValues
    valueTests: IValueTest[]
    fields: IFields
    validate?: ValidateFunction
}

const DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: getFormErrors,
}

export const getInitialState = (
    props: Partial<IInitialStateOptions> = DEF_INITIAL_STATE_OPTIONS
): IFormState => {
    const {
        initialValues = {},
        valueTests = [],
        fields = {},
        validate: _validate = getFormErrors,
    } = props

    return {
        status: EnumFormStatus.Initial,
        values: initialValues,
        isSending: false,
        isCanceling: false,
        isSuccess: false,
        sendError: null,
        tests: valueTests,
        validate: _validate,
        touched: [],
        fields,
        errors: {},
    }
}

export interface IUseFormOptions extends Partial<IInitialStateOptions> {
    middlewares?: any[]
    debug?: boolean
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
    const setValues = useSetValues(props, store, dispatch)

    const setTouched = useSetTouched(props, store, dispatch)
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
    /**
     * @deprecated
     */
    IsFormValid: (c: boolean) => boolean
    isFormValid: (c: boolean) => boolean
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

    const validate = useIsFormValid(props, store, dispatch)

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
        IsFormValid: validate,
        isFormValid: validate,

        store,
        dispatch,

        send,
    }
}

export type IUseFormFieldRule = [Function[], string?]
export interface IUseFormField {
    label: string
    initialValue?: string
    rules?: IUseFormFieldRule[]
}

export type TypeUseFormField = IUseFormField | string

export type FormSettingsTypeFields = Record<string, TypeUseFormField>

export interface IUseFormSettings {
    fields: FormSettingsTypeFields
    value?: IValues
    onChange?: (v: IValues) => void
    options?: IUseFormOptions
}

const useFormConfigBySettings = (props: IUseFormSettings): IUseFormOptions => {
    return useMemo<IUseFormOptions>(() => {
        const _config = {
            initialValues: props.value ? props.value : {},
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
                    initialValue: undefined,
                    rules: [],
                }
            } else {
                field = _field as IUseFormField
            }

            _config.fields[fieldName] = field.label || fieldName

            if (!props.value)
                _config.initialValues[fieldName] = field.initialValue

            if (field.rules?.length) {
                field.rules.forEach((rule: IUseFormFieldRule) => {
                    _config.valueTests.push([[fieldName], ...rule])
                })
            }
        })

        return _config
    }, [])
}

const useControlledForm = (form: UseFormConfig, props: IUseFormSettings) => {
    const { value, onChange, options } = props

    const valueRef = useRef(value)
    const onChangeRef = useRefBy(onChange)

    const mountFlag = useRef(false)

    useEffect(() => {
        if (
            value &&
            value !== valueRef.current &&
            !isEqual(value, valueRef.current)
        ) {
            if (options?.debug)
                console.log("[useForm][Update values from external]", {
                    external: value,
                    current: valueRef.current,
                })

            valueRef.current = value

            form.setValues(value)
        }
    }, [value])

    useEffect(() => {
        if (mountFlag.current) {
            if (
                onChangeRef.current &&
                valueRef.current !== form.values &&
                !isEqual(valueRef.current, form.values)
            ) {
                if (options?.debug)
                    console.log("[useForm][Emit values to external]", {
                        current: form.values,
                        external: valueRef.current,
                    })

                valueRef.current = form.values

                onChangeRef.current(form.values)
            }
        } else {
            mountFlag.current = true
        }
    }, [form.values])

    useEffect(() => {
        if (value && value !== form.store.getState().values) {
            if (options?.debug)
                console.log("[useForm][Set initials values]", {
                    external: value,
                    current: form.store.getState().values,
                })

            form.setValues(value)
        }
    }, [])
}

const useForm = (props: IUseFormSettings) => {
    const formConfig = useFormConfigBySettings(props)

    const form = useFormCore(formConfig)

    useControlledForm(form, props)

    return form
}

export default useForm
