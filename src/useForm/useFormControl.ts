import type { IFormConfig } from "./useForm"
import type { DispatchFunction, IStore } from "../utils/useReducer"
import {
    FORM_ACTIONS,
    type IFormState,
    type ITouched,
    type IValues,
    type IValueTest,
    type ValidateFunction,
    type IErrors,
    type IError,
} from "./reducer"

import { useCallback } from "react"

import {
    useSetCustomErrorByName,
    useSetCustomErrors,
    useSetErrors,
    useSetFieldTouched,
    useSetFieldValue,
    useSetTests,
    useSetTouched,
    useSetValidate,
    useSetValues,
} from "./helpers"

export type SendFunction = (api: Function) => Promise<any>

export interface IUseFormControl {
    send: SendFunction
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
    setCustomErrors: (newErrors: IErrors) => void
    setCustomErrorByName: (name: string, error: IError) => void
}

const useFormControl = (
    props: IFormConfig,
    store: IStore<IFormState>,
    dispatch: DispatchFunction
): IUseFormControl => {
    const setValues = useSetValues(props, store, dispatch)

    const setTouched = useSetTouched(props, store, dispatch)
    const setTests = useSetTests(props, store, dispatch)
    const setValidate = useSetValidate(props, store, dispatch)
    const setErrors = useSetErrors(props, store, dispatch)
    const setCustomErrors = useSetCustomErrors(props, store, dispatch)
    const setCustomErrorByName = useSetCustomErrorByName(props, store, dispatch)
    const setValue = useSetFieldValue(props, store, dispatch)
    const setTouchedByName = useSetFieldTouched(props, store, dispatch)

    const send = useCallback<SendFunction>((api: Function) => {
        return new Promise((onResolve, onReject) => {
            dispatch({
                type: FORM_ACTIONS.SEND_FORM,
                payload: {
                    api,
                    onResolve,
                    onReject,
                },
            })
        })
    }, [])

    return {
        send,
        setValue,
        setTouchedByName,
        setTouched,
        setValues,
        setTests,
        setValidate,
        setErrors,
        setCustomErrors,
        setCustomErrorByName,
    }
}

export default useFormControl
