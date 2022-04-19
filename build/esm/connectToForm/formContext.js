/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";
import { getInitialState } from "../useForm/index";
export const defaultValidate = ({ errors = {} }) => errors;
const DEF_VALUES = {
    ...getInitialState(),
    send: () => { },
    IsFormValid: (_c) => {
        return true;
    },
    setValue: (_name, _value, _silent, _checkOnlyFilled, _type) => { },
    setTouchedByName: (_name, _value, _silent) => { },
    setTouched: (_newTouched, _silent, _checkOnlyFilled) => { },
    setValues: (_newValues, _silent, _checkOnlyFilled, _type) => { },
    setTests: (_newTests, _silent, _checkOnlyFilled) => { },
    setValidate: (_newValidate, _silent, _checkOnlyFilled) => { },
    setErrors: (_newErrors) => { },
    store: {
        getState: () => {
            return getInitialState();
        },
        dispatch: (..._args) => { },
    },
    dispatch: (..._args) => { },
};
const FormContext = createContext(DEF_VALUES);
FormContext.displayName = "FormContext";
export const useFormContext = () => {
    const ctx = useContext(FormContext);
    if (!ctx) {
        throw new Error("You must wrap your component in form provider");
    }
    return ctx;
};
export default FormContext;
