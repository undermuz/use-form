"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormContext = exports.defaultValidate = void 0;
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
const react_1 = require("react");
const index_1 = require("../useForm/index");
const defaultValidate = ({ errors = {} }) => errors;
exports.defaultValidate = defaultValidate;
const DEF_VALUES = {
    ...(0, index_1.getInitialState)(),
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
            return (0, index_1.getInitialState)();
        },
        dispatch: (..._args) => { },
    },
    dispatch: (..._args) => { },
};
const FormContext = (0, react_1.createContext)(DEF_VALUES);
FormContext.displayName = "FormContext";
const useFormContext = () => {
    const ctx = (0, react_1.useContext)(FormContext);
    if (!ctx) {
        throw new Error("You must wrap your component in form provider");
    }
    return ctx;
};
exports.useFormContext = useFormContext;
exports.default = FormContext;
