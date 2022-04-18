/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react"
import { getInitialState, UseFormConfig } from "../useForm/index"

export const defaultValidate = ({ errors = {} }) => errors

const DEF_VALUES: UseFormConfig = {
    ...getInitialState(),
    send: () => {},

    IsFormValid: (c) => {
        return true
    },
    setValue: (name, value, silent, checkOnlyFilled, type) => {},
    setTouchedByName: (name, value, silent) => {},
    setTouched: (newTouched, silent, checkOnlyFilled) => {},
    setValues: (newValues, silent, checkOnlyFilled, type) => {},
    setTests: (newTests, silent, checkOnlyFilled) => {},
    setValidate: (newValidate, silent, checkOnlyFilled) => {},
    setErrors: (newErrors) => {},

    store: {
        getState: () => {
            return getInitialState()
        },
        dispatch: (...args) => {},
    },
    dispatch: (...args) => {},
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

export default FormContext
