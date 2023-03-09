import { useCallback } from "react"

import {
    FORM_ACTIONS,
    type IErrors,
    type IFormState,
    type ITouched,
    type IValues,
    type IValueTest,
    type ValidateFunction,
    type IError,
} from "./reducer"

import type { DispatchFunction, IStore } from "../utils/useReducer"

export interface IUseIsFormSettings {
    [k: string]: any
    debug?: boolean
}

export const isFormHasErrors = (
    settings: IUseIsFormSettings,
    store: IStore<IFormState>,
    checkOnlyFilled: boolean = true
): [boolean, IErrors] => {
    const { debug } = settings

    const state = store.getState()

    const { validate, touched, fields } = state

    const newErrors = validate(
        {
            ...state,
            touched: checkOnlyFilled ? touched : Object.keys(fields),
        },
        debug
    )

    return [Object.keys(newErrors).length > 0, newErrors]
}

export const useHasFormErrors = (
    settings: IUseIsFormSettings,
    store: IStore<IFormState>,
    _dispatch: DispatchFunction
) => {
    return useCallback((checkOnlyFilled = true) => {
        return isFormHasErrors(settings, store, checkOnlyFilled)
    }, [])
}

export const useIsFormValid = (
    settings: IUseIsFormSettings,
    store: IStore<IFormState>,
    _dispatch: DispatchFunction
) => {
    return useCallback((checkOnlyFilled = true) => {
        return !isFormHasErrors(settings, store, checkOnlyFilled)[0]
    }, [])
}

export const useValidate = (
    _settings: IUseIsFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback((checkOnlyFilled = true) => {
        dispatch({
            type: FORM_ACTIONS.VALIDATE_FORM,
            payload: {},
            silent: false,
            checkOnlyFilled,
        })
    }, [])
}

export const useSetTouched = (
    _settings: IUseIsFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (newTouched: ITouched, silent = false, checkOnlyFilled = true) => {
            dispatch({
                type: FORM_ACTIONS.SET_TOUCHED,
                payload: { touched: newTouched },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetValues = (
    _settings: IUseIsFormSettings,
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
                type: FORM_ACTIONS.SET_VALUES,
                payload: { values: newValues, type },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetTests = (
    _settings: IUseIsFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (newTests: IValueTest[], silent = false, checkOnlyFilled = true) => {
            dispatch({
                type: FORM_ACTIONS.SET_TESTS,
                payload: { tests: newTests },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetErrors = (
    _settings: IUseIsFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback((newErrors: IErrors) => {
        dispatch({
            type: FORM_ACTIONS.SET_ERRORS,
            payload: { errors: newErrors },
        })
    }, [])
}

export const useSetCustomErrors = (
    _settings: IUseIsFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback((newErrors: IErrors) => {
        dispatch({
            type: FORM_ACTIONS.SET_CUSTOM_ERRORS,
            payload: { errors: newErrors },
        })
    }, [])
}

export const useSetCustomErrorByName = (
    _settings: IUseIsFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback((name: string, value: IError) => {
        dispatch({
            type: FORM_ACTIONS.SET_CUSTOM_ERROR_FIELD,
            payload: {
                name,
                value,
            },
        })
    }, [])
}

export const useSetFieldValue = (
    _settings: IUseIsFormSettings,
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
                type: FORM_ACTIONS.SET_VALUE,
                payload: { name, value, type },
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}

export const useSetFieldTouched = (
    _settings: IUseIsFormSettings,
    _store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    return useCallback(
        (name: string, value: boolean = true, silent = false) => {
            dispatch({
                type: FORM_ACTIONS.SET_TOUCHED_FIELD,
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
    _settings: IUseIsFormSettings,
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
                type: FORM_ACTIONS.SET_VALIDATE,
                payload: newValidate,
                silent,
                checkOnlyFilled,
            })
        },
        []
    )
}
