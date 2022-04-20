"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetValidate = exports.useSetFieldTouched = exports.useSetFieldValue = exports.useSetErrors = exports.useSetTests = exports.useSetValues = exports.useSetTouched = exports.useIsFormValid = exports.isFormHasErrors = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var reducer_1 = require("./reducer");
var validate_1 = require("./middlewares/validate");
var isFormHasErrors = function (settings, store, checkOnlyFilled) {
    if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
    var debug = settings.debug;
    var state = store.getState();
    var validate = state.validate, touched = state.touched, fields = state.fields;
    var validateFn = validate !== null && validate !== void 0 ? validate : validate_1.getFormErrors;
    var newErrors = validateFn(tslib_1.__assign(tslib_1.__assign({}, state), { touched: checkOnlyFilled ? touched : Object.keys(fields) }), debug);
    return [Object.keys(newErrors).length > 0, newErrors];
};
exports.isFormHasErrors = isFormHasErrors;
var useIsFormValid = function (settings, store, _dispatch) {
    return (0, react_1.useCallback)(function (checkOnlyFilled) {
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        return !(0, exports.isFormHasErrors)(settings, store, checkOnlyFilled)[0];
    }, []);
};
exports.useIsFormValid = useIsFormValid;
var useSetTouched = function (_settings, _store, dispatch) {
    return (0, react_1.useCallback)(function (newTouched, silent, checkOnlyFilled) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        dispatch({
            type: reducer_1.SET_TOUCHED,
            payload: { touched: newTouched },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
exports.useSetTouched = useSetTouched;
var useSetValues = function (_settings, _store, dispatch) {
    return (0, react_1.useCallback)(function (newValues, silent, checkOnlyFilled, type) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        if (type === void 0) { type = "system"; }
        dispatch({
            type: reducer_1.SET_VALUES,
            payload: { values: newValues, type: type },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
exports.useSetValues = useSetValues;
var useSetTests = function (_settings, _store, dispatch) {
    return (0, react_1.useCallback)(function (newTests, silent, checkOnlyFilled) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        dispatch({
            type: reducer_1.SET_TESTS,
            payload: { tests: newTests },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
exports.useSetTests = useSetTests;
var useSetErrors = function (_settings, _store, dispatch) {
    return (0, react_1.useCallback)(function (newErrors) {
        dispatch({
            type: reducer_1.SET_ERRORS,
            payload: { errors: newErrors },
        });
    }, []);
};
exports.useSetErrors = useSetErrors;
var useSetFieldValue = function (_settings, _store, dispatch) {
    return (0, react_1.useCallback)(function (name, value, silent, checkOnlyFilled, type) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        if (type === void 0) { type = "system"; }
        dispatch({
            type: reducer_1.SET_VALUE,
            payload: { name: name, value: value, type: type },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
exports.useSetFieldValue = useSetFieldValue;
var useSetFieldTouched = function (_settings, _store, dispatch) {
    return (0, react_1.useCallback)(function (name, value, silent) {
        if (value === void 0) { value = true; }
        if (silent === void 0) { silent = false; }
        dispatch({
            type: reducer_1.SET_TOUCHED_FIELD,
            payload: {
                name: name,
                value: value,
            },
            silent: silent,
        });
    }, []);
};
exports.useSetFieldTouched = useSetFieldTouched;
var useSetValidate = function (_settings, _store, dispatch) {
    return (0, react_1.useCallback)(function (newValidate, silent, checkOnlyFilled) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        dispatch({
            type: reducer_1.SET_VALIDATE,
            payload: newValidate,
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
exports.useSetValidate = useSetValidate;
