"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormContext = exports.defaultValidate = void 0;
var tslib_1 = require("tslib");
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */
var react_1 = require("react");
var index_1 = require("../useForm/index");
var defaultValidate = function (_a) {
    var _b = _a.errors, errors = _b === void 0 ? {} : _b;
    return errors;
};
exports.defaultValidate = defaultValidate;
var DEF_VALUES = tslib_1.__assign(tslib_1.__assign({}, (0, index_1.getInitialState)()), { send: function () {
        return Promise.resolve();
    }, IsFormValid: function (_c) {
        return true;
    }, setValue: function (_name, _value, _silent, _checkOnlyFilled, _type) { }, setTouchedByName: function (_name, _value, _silent) { }, setTouched: function (_newTouched, _silent, _checkOnlyFilled) { }, setValues: function (_newValues, _silent, _checkOnlyFilled, _type) { }, setTests: function (_newTests, _silent, _checkOnlyFilled) { }, setValidate: function (_newValidate, _silent, _checkOnlyFilled) { }, setErrors: function (_newErrors) { }, store: {
        getState: function () {
            return (0, index_1.getInitialState)();
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
var FormContext = (0, react_1.createContext)(DEF_VALUES);
FormContext.displayName = "FormContext";
var useFormContext = function () {
    var ctx = (0, react_1.useContext)(FormContext);
    if (!ctx) {
        throw new Error("You must wrap your component in form provider");
    }
    return ctx;
};
exports.useFormContext = useFormContext;
exports.default = FormContext;
