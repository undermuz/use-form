/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react"
import { getInitialState } from "../useForm/getInitialState"
import type { UseFormConfig } from "../useForm/useForm"
import { EnumFormStatus } from "../useForm/reducer"

export const defaultValidate = ({ errors = {} }) => errors

const DEF_VALUES: UseFormConfig = {
    status: EnumFormStatus.Initial,
    values: {},
    isSending: false,
    isCanceling: false,
    isSuccess: false,
    sendError: null,
    tests: [],
    validate: (_c) => true,
    touched: [],
    fields: [],
    errors: {},
    customErrors: {},
    send: () => {
        return Promise.resolve()
    },
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
            return getInitialState()
        },
        dispatch: (..._args) => {},
    },
    dispatch: (..._args) => {},
}

const FormContext = createContext<UseFormConfig>(DEF_VALUES)

FormContext.displayName = "FormContext"

export const useFormContext = () => {
    const ctx = useContext(FormContext)

    if (!ctx) {
        throw new Error("You must wrap your component in form provider")
    }

    return ctx
}

export { FormContext }
