/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { type Context, createContext, useContext } from "react"
import { getInitialState } from "../useForm/getInitialState"
import type { UseFormConfig } from "../useForm/useForm"
import { EnumFormStatus } from "../useForm/reducer"

export const defaultValidate = ({ errors = {} }) => errors

const initialState = getInitialState()

export const DEF_VALUES: UseFormConfig = {
    status: EnumFormStatus.Initial,
    values: {},
    isSending: false,
    isCanceling: false,
    isSuccess: false,
    sendError: null,
    tests: [],
    config: {},
    touched: [],
    fields: {},
    errors: {},
    customErrors: {},
    // IUseFormControl.validate — not state ValidateFunction
    validate: (_checkOnlyFilled) => {},
    send: (async () => {
        return { response: undefined as unknown, values: {} }
    }) as UseFormConfig["send"],
    hasFormErrors(_c) {
        return [true, {}]
    },
    isFormValid: (_c) => {
        return true
    },
    IsFormValid: (_c) => {
        return true
    },
    setValue: (_name, _value, _silent, _checkOnlyFilled, _type) => {},
    setTouchedByName: (_name, _value, _silent) => {},
    setTouched: (_newTouched, _silent, _checkOnlyFilled) => {},
    setValues: (_newValues, _silent, _checkOnlyFilled, _type) => {},
    getValues: () => {
        return {}
    },
    setTests: (_newTests, _silent, _checkOnlyFilled) => {},
    setValidate: (_newValidate, _silent, _checkOnlyFilled) => {},
    setErrors: (_newErrors) => {},
    getErrors: () => {
        return {}
    },
    setCustomErrors: (_newErrors) => {},
    setCustomErrorByName: (_name, _error) => {},

    store: {
        getState: () => {
            return initialState
        },
        dispatch: (..._args) => {},
    },
    dispatch: (..._args) => {},
    reset: () => {},
}

/**
 * Holds any `UseFormConfig<T>`. React context cannot be generic, so the value
 * type is intentionally loose (`any`); narrow with `useFormContext<T>()`.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormContext = createContext<UseFormConfig<any> | null>(null)

FormContext.displayName = "FormContext"

export const useFormContext = <
    T extends Record<string, unknown> = Record<string, unknown>
>() => {
    const ctx = useContext(
        FormContext as Context<UseFormConfig<T> | null>
    )

    if (!ctx) {
        throw new Error("You must wrap your component in form provider")
    }

    return ctx
}

export { FormContext }
