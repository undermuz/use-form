import { __assign } from "tslib";
import { useCallback } from "react";
import { SET_ERRORS, SET_TESTS, SET_TOUCHED, SET_TOUCHED_FIELD, SET_VALIDATE, SET_VALUE, SET_VALUES, } from "./reducer";
export var isFormHasErrors = function (settings, store, checkOnlyFilled) {
    if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
    var debug = settings.debug;
    var state = store.getState();
    var validate = state.validate, touched = state.touched, fields = state.fields;
    var newErrors = validate(__assign(__assign({}, state), { touched: checkOnlyFilled ? touched : Object.keys(fields) }), debug);
    return [Object.keys(newErrors).length > 0, newErrors];
};
export var useIsFormValid = function (settings, store, _dispatch) {
    return useCallback(function (checkOnlyFilled) {
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        return !isFormHasErrors(settings, store, checkOnlyFilled)[0];
    }, []);
};
export var useSetTouched = function (_settings, _store, dispatch) {
    return useCallback(function (newTouched, silent, checkOnlyFilled) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        dispatch({
            type: SET_TOUCHED,
            payload: { touched: newTouched },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
export var useSetValues = function (_settings, _store, dispatch) {
    return useCallback(function (newValues, silent, checkOnlyFilled, type) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        if (type === void 0) { type = "system"; }
        dispatch({
            type: SET_VALUES,
            payload: { values: newValues, type: type },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
export var useSetTests = function (_settings, _store, dispatch) {
    return useCallback(function (newTests, silent, checkOnlyFilled) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        dispatch({
            type: SET_TESTS,
            payload: { tests: newTests },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
export var useSetErrors = function (_settings, _store, dispatch) {
    return useCallback(function (newErrors) {
        dispatch({
            type: SET_ERRORS,
            payload: { errors: newErrors },
        });
    }, []);
};
export var useSetFieldValue = function (_settings, _store, dispatch) {
    return useCallback(function (name, value, silent, checkOnlyFilled, type) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        if (type === void 0) { type = "system"; }
        dispatch({
            type: SET_VALUE,
            payload: { name: name, value: value, type: type },
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
export var useSetFieldTouched = function (_settings, _store, dispatch) {
    return useCallback(function (name, value, silent) {
        if (value === void 0) { value = true; }
        if (silent === void 0) { silent = false; }
        dispatch({
            type: SET_TOUCHED_FIELD,
            payload: {
                name: name,
                value: value,
            },
            silent: silent,
        });
    }, []);
};
export var useSetValidate = function (_settings, _store, dispatch) {
    return useCallback(function (newValidate, silent, checkOnlyFilled) {
        if (silent === void 0) { silent = false; }
        if (checkOnlyFilled === void 0) { checkOnlyFilled = true; }
        dispatch({
            type: SET_VALIDATE,
            payload: newValidate,
            silent: silent,
            checkOnlyFilled: checkOnlyFilled,
        });
    }, []);
};
