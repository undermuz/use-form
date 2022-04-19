"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSetValidate = exports.useSetFieldTouched = exports.useSetFieldValue = exports.useSetErrors = exports.useSetTests = exports.useSetValues = exports.useSetTouched = exports.useIsFormValid = exports.isFormHasErrors = void 0;
const react_1 = require("react");
const reducer_1 = require("./reducer");
const validate_1 = require("./middlewares/validate");
const isFormHasErrors = (settings, store, checkOnlyFilled = true) => {
    const { debug } = settings;
    const state = store.getState();
    const { validate, touched, fields } = state;
    const validateFn = validate !== null && validate !== void 0 ? validate : validate_1.getFormErrors;
    const newErrors = validateFn({
        ...state,
        touched: checkOnlyFilled ? touched : Object.keys(fields),
    }, debug);
    return [Object.keys(newErrors).length > 0, newErrors];
};
exports.isFormHasErrors = isFormHasErrors;
const useIsFormValid = (settings, store, _dispatch) => {
    return (0, react_1.useCallback)((checkOnlyFilled = true) => {
        return !(0, exports.isFormHasErrors)(settings, store, checkOnlyFilled)[0];
    }, []);
};
exports.useIsFormValid = useIsFormValid;
const useSetTouched = (_settings, _store, dispatch) => {
    return (0, react_1.useCallback)((newTouched, silent = false, checkOnlyFilled = true) => {
        dispatch({
            type: reducer_1.SET_TOUCHED,
            payload: { touched: newTouched },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
exports.useSetTouched = useSetTouched;
const useSetValues = (_settings, _store, dispatch) => {
    return (0, react_1.useCallback)((newValues, silent = false, checkOnlyFilled = true, type = "system") => {
        dispatch({
            type: reducer_1.SET_VALUES,
            payload: { values: newValues, type },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
exports.useSetValues = useSetValues;
const useSetTests = (_settings, _store, dispatch) => {
    return (0, react_1.useCallback)((newTests, silent = false, checkOnlyFilled = true) => {
        dispatch({
            type: reducer_1.SET_TESTS,
            payload: { tests: newTests },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
exports.useSetTests = useSetTests;
const useSetErrors = (_settings, _store, dispatch) => {
    return (0, react_1.useCallback)((newErrors) => {
        dispatch({
            type: reducer_1.SET_ERRORS,
            payload: { errors: newErrors },
        });
    }, []);
};
exports.useSetErrors = useSetErrors;
const useSetFieldValue = (_settings, _store, dispatch) => {
    return (0, react_1.useCallback)((name, value, silent = false, checkOnlyFilled = true, type = "system") => {
        dispatch({
            type: reducer_1.SET_VALUE,
            payload: { name, value, type },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
exports.useSetFieldValue = useSetFieldValue;
const useSetFieldTouched = (_settings, _store, dispatch) => {
    return (0, react_1.useCallback)((name, value = true, silent = false) => {
        dispatch({
            type: reducer_1.SET_TOUCHED_FIELD,
            payload: {
                name,
                value,
            },
            silent,
        });
    }, []);
};
exports.useSetFieldTouched = useSetFieldTouched;
const useSetValidate = (_settings, _store, dispatch) => {
    return (0, react_1.useCallback)((newValidate, silent = false, checkOnlyFilled = true) => {
        dispatch({
            type: reducer_1.SET_VALIDATE,
            payload: newValidate,
            silent,
            checkOnlyFilled,
        });
    }, []);
};
exports.useSetValidate = useSetValidate;
