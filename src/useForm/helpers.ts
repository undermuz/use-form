import { useCallback } from "react"

import {
    IErrors,
    IFormState,
    ITouched,
    IValues,
    IValueTest,
    SET_ERRORS,
    SET_TESTS,
    SET_TOUCHED,
    SET_TOUCHED_FIELD,
    SET_VALIDATE,
    SET_VALUE,
    SET_VALUES,
    ValidateFunction,
} from "./reducer"

import { getFormErrors } from "./middlewares/validate"
import { DispatchFunction, IStore } from "../useReducer/index"

export interface IUseFormSettings {
    [k: string]: any
    debug?: boolean
}

export const isFormHasErrors = (
    settings: IUseFormSettings,
    store: IStore<IFormState>,
    checkOnlyFilled: boolean = true
) => {
    const { debug } = settings

    const state = store.getState()

    const { validate, touched, fields } = state

    const validateFn = validate ?? getFormErrors

    const newErrors = validateFn(
        {
            ...state,
            touched: checkOnlyFilled ? touched : Object.keys(fields),
        },
        debug
    )

    return [Object.keys(newErrors).length > 0, newErrors]
}

export const useIsFormValid = (
    settings: IUseFormSettings,
    store: IStore<IFormState>,
    _dispatch: DispatchFunction
) => {
    return useCallback((checkOnlyFilled = true) => {
        return !isFormHasErrors(settings, store, checkOnlyFilled)[0]
    }, [])
}

export const useSetTouched = (
    _settings: IUseFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (newTouched: ITouched, silent = false, checkOnlyFilled = true) => {
            dispatch({
                type: SET_TOUCHED,
                payload: { touched: newTouched },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetValues = (
    _settings: IUseFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (
            newValues: IValues,
            silent = false,
            checkOnlyFilled = true,
            type = "system"
        ) => {
            dispatch({
                type: SET_VALUES,
                payload: { values: newValues, type },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetTests = (
    _settings: IUseFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (newTests: IValueTest[], silent = false, checkOnlyFilled = true) => {
            dispatch({
                type: SET_TESTS,
                payload: { tests: newTests },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetErrors = (
    _settings: IUseFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback((newErrors: IErrors) => {
        dispatch({
            type: SET_ERRORS,
            payload: { errors: newErrors },
        })
    }, [])
}

export const useSetFieldValue = (
    _settings: IUseFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (
            name: string,
            value: any,
            silent = false,
            checkOnlyFilled = true,
            type = "system"
        ) => {
            dispatch({
                type: SET_VALUE,
                payload: { name, value, type },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetFieldTouched = (
    _settings: IUseFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (name: string, value: boolean = true, silent = false) => {
            dispatch({
                type: SET_TOUCHED_FIELD,
                payload: {
                    name,
                    value,
                },
                silent,
            })
        },
        []
    )
}

export const useSetValidate = (
    _settings: IUseFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (
            newValidate: ValidateFunction,
            silent = false,
            checkOnlyFilled = true
        ) => {
            dispatch({
                type: SET_VALIDATE,
                payload: newValidate,
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}
