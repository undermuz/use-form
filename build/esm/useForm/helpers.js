import { useCallback } from "react";
import { SET_ERRORS, SET_TESTS, SET_TOUCHED, SET_TOUCHED_FIELD, SET_VALIDATE, SET_VALUE, SET_VALUES, } from "./reducer";
import { getFormErrors } from "./middlewares/validate";
export const isFormHasErrors = (settings, store, checkOnlyFilled = true) => {
    const { debug } = settings;
    const state = store.getState();
    const { validate, touched, fields } = state;
    const validateFn = validate !== null && validate !== void 0 ? validate : getFormErrors;
    const newErrors = validateFn({
        ...state,
        touched: checkOnlyFilled ? touched : Object.keys(fields),
    }, debug);
    return [Object.keys(newErrors).length > 0, newErrors];
};
export const useIsFormValid = (settings, store, _dispatch) => {
    return useCallback((checkOnlyFilled = true) => {
        return !isFormHasErrors(settings, store, checkOnlyFilled)[0];
    }, []);
};
export const useSetTouched = (_settings, _store, dispatch) => {
    return useCallback((newTouched, silent = false, checkOnlyFilled = true) => {
        dispatch({
            type: SET_TOUCHED,
            payload: { touched: newTouched },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
export const useSetValues = (_settings, _store, dispatch) => {
    return useCallback((newValues, silent = false, checkOnlyFilled = true, type = "system") => {
        dispatch({
            type: SET_VALUES,
            payload: { values: newValues, type },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
export const useSetTests = (_settings, _store, dispatch) => {
    return useCallback((newTests, silent = false, checkOnlyFilled = true) => {
        dispatch({
            type: SET_TESTS,
            payload: { tests: newTests },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
export const useSetErrors = (_settings, _store, dispatch) => {
    return useCallback((newErrors) => {
        dispatch({
            type: SET_ERRORS,
            payload: { errors: newErrors },
        });
    }, []);
};
export const useSetFieldValue = (_settings, _store, dispatch) => {
    return useCallback((name, value, silent = false, checkOnlyFilled = true, type = "system") => {
        dispatch({
            type: SET_VALUE,
            payload: { name, value, type },
            silent,
            checkOnlyFilled,
        });
    }, []);
};
export const useSetFieldTouched = (_settings, _store, dispatch) => {
    return useCallback((name, value = true, silent = false) => {
        dispatch({
            type: SET_TOUCHED_FIELD,
            payload: {
                name,
                value,
            },
            silent,
        });
    }, []);
};
export const useSetValidate = (_settings, _store, dispatch) => {
    return useCallback((newValidate, silent = false, checkOnlyFilled = true) => {
        dispatch({
            type: SET_VALIDATE,
            payload: newValidate,
            silent,
            checkOnlyFilled,
        });
    }, []);
};
