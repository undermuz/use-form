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
    type FieldName,
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
    useValidate,
} from "./helpers"

/** API callback passed to `form.send` / `FormSubmit.onSend`. */
export type FormSendApi<T extends IValues = IValues, R = unknown> = (
    values: T,
) => R | Promise<R>

/** Resolved value of `form.send(api)`. */
export type FormSendResult<T extends IValues = IValues, R = unknown> = {
    response: R
    values: T
}

export type SendFunction<T extends IValues = IValues> = <R = unknown>(
    api: FormSendApi<T, R>,
) => Promise<FormSendResult<T, R>>

/**
 * Form controls. Method syntax (not property functions) so parameters are
 * bivariant under `strictFunctionTypes` — `UseFormConfig<T>` stays assignable
 * to the default `UseFormConfig` used by FormContext.
 */
export interface IUseFormControl<T extends IValues = IValues> {
    send: SendFunction<T>
    validate(checkOnlyFilled?: boolean): void
    setValue<K extends FieldName<T>>(
        name: K,
        value: T[K],
        silent?: boolean,
        checkOnlyFilled?: boolean,
        type?: string,
    ): void
    setTouchedByName(
        name: FieldName<T>,
        value?: boolean,
        silent?: boolean,
    ): void
    setTouched(
        newTouched: ITouched<T>,
        silent?: boolean,
        checkOnlyFilled?: boolean,
    ): void
    setValues(
        newValues: T,
        silent?: boolean,
        checkOnlyFilled?: boolean,
        type?: string,
    ): void
    getValues(): T
    setTests(
        newTests: IValueTest<T>[],
        silent?: boolean,
        checkOnlyFilled?: boolean,
    ): void
    setValidate(
        newValidate: ValidateFunction,
        silent?: boolean,
        checkOnlyFilled?: boolean,
    ): void
    setErrors(newErrors: IErrors<T>): void
    setCustomErrors(newErrors: IErrors<T>): void
    setCustomErrorByName(name: FieldName<T>, error: IError): void
}

const useFormControl = <T extends IValues = IValues>(
    props: IFormConfig<T>,
    store: IStore<IFormState<T>>,
    dispatch: DispatchFunction,
): IUseFormControl<T> => {
    const looseStore = store as IStore<IFormState>

    const setValues = useSetValues(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setValues"]

    const getValues = useCallback((): T => {
        return store.getState().values
    }, [])

    const setTouched = useSetTouched(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setTouched"]
    const setTests = useSetTests(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setTests"]
    const setValidate = useSetValidate(props, looseStore, dispatch)
    const setErrors = useSetErrors(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setErrors"]
    const setCustomErrors = useSetCustomErrors(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setCustomErrors"]
    const setCustomErrorByName = useSetCustomErrorByName(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setCustomErrorByName"]
    const setValue = useSetFieldValue(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setValue"]
    const setTouchedByName = useSetFieldTouched(
        props,
        looseStore,
        dispatch,
    ) as IUseFormControl<T>["setTouchedByName"]
    const validate = useValidate(props, looseStore, dispatch)

    const send = useCallback<SendFunction<T>>((api) => {
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
        validate,
        setValue,
        getValues,
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

export { useFormControl }
