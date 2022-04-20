import { __assign } from "tslib";
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
import { createContext, useContext } from "react";
import { getInitialState } from "../useForm/index";
export var defaultValidate = function (_a) {
    var _b = _a.errors, errors = _b === void 0 ? {} : _b;
    return errors;
};
var DEF_VALUES = __assign(__assign({}, getInitialState()), { send: function () {
        return Promise.resolve();
    }, IsFormValid: function (_c) {
        return true;
    }, setValue: function (_name, _value, _silent, _checkOnlyFilled, _type) { }, setTouchedByName: function (_name, _value, _silent) { }, setTouched: function (_newTouched, _silent, _checkOnlyFilled) { }, setValues: function (_newValues, _silent, _checkOnlyFilled, _type) { }, setTests: function (_newTests, _silent, _checkOnlyFilled) { }, setValidate: function (_newValidate, _silent, _checkOnlyFilled) { }, setErrors: function (_newErrors) { }, store: {
        getState: function () {
            return getInitialState();
        },
        dispatch: function () {
            var _args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                _args[_i] = arguments[_i];
            }
        },
    }, dispatch: function () {
        var _args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            _args[_i] = arguments[_i];
        }
    } });
var FormContext = createContext(DEF_VALUES);
FormContext.displayName = "FormContext";
export var useFormContext = function () {
    var ctx = useContext(FormContext);
    if (!ctx) {
        throw new Error("You must wrap your component in form provider");
    }
    return ctx;
};
export default FormContext;
