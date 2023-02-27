import type { IAction } from "../utils/useReducer"
import { getFormErrors } from "./middlewares/validate"

const IsFunction = (value: any): boolean =>
    Boolean(value) &&
    ["[object Function]", "[object AsyncFunction]"].includes(
        {}.toString.call(value)
    )

const SET_VALUES = "set_values"
const SET_VALUE = "set_value"
const SET_TESTS = "set_tests"
const SET_TOUCHED_FIELD = "set_touched_field"
const SET_TOUCHED = "set_touched"
const SET_ERRORS = "set_errors"
const SET_CUSTOM_ERRORS = "set_custom_errors"
const SET_CUSTOM_ERROR_FIELD = "set_custom_error_field"
const SET_FIELDS = "set_fields"
const SET_VALIDATE = "set_validate"
const SET_IS_SENDING = "set_is_sending"
const SET_IS_CANCELING = "set_is_canceling"
const SET_IS_SUCCESS = "set_is_success"
const SET_SEND_ERROR = "set_send_error"
const VALIDATE_FORM = "validate_form"
const SEND_FORM = "send_form"

export const FORM_ACTIONS = {
    SET_ERRORS,
    SET_VALUES,
    SET_VALUE,
    SET_TESTS,
    SET_TOUCHED_FIELD,
    SET_TOUCHED,
    SET_CUSTOM_ERRORS,
    SET_CUSTOM_ERROR_FIELD,
    SET_FIELDS,
    SET_VALIDATE,
    SET_IS_SENDING,
    SET_IS_CANCELING,
    SET_IS_SUCCESS,
    SET_SEND_ERROR,
    VALIDATE_FORM,
    SEND_FORM,
}

export type IValueTest = [Array<string>, Array<Function>, string?]

export type ValidateFunction = (
    formState: IFormState,
    debug?: boolean
) => IErrors

export interface IFields {
    [s: string]: any
}

export type ITouched = Array<string>

export interface IValues {
    [s: string]: any
}

export type IError = string[]

export interface IErrors {
    [s: string]: IError
}

export enum EnumFormStatus {
    Initial = "initial",
}

export interface IFormState {
    status: EnumFormStatus
    isSending: boolean
    isCanceling: boolean
    isSuccess: boolean
    sendError: any
    values: IValues
    tests: IValueTest[]
    validate: ValidateFunction
    touched: ITouched
    fields: IFields
    errors: IErrors
    customErrors: IErrors
}

export const valuesReducer = (state: IValues, action: IAction): IValues => {
    switch (action.type) {
        case FORM_ACTIONS.SET_VALUES:
            if (IsFunction(action.payload.values)) {
                return action.payload.values(state)
            }

            return action.payload.values
        case FORM_ACTIONS.SET_VALUE:
            if (IsFunction(action.payload.value)) {
                return {
                    ...state,
                    [action.payload.name]: action.payload.value(
                        state[action.payload.name]
                    ),
                }
            }

            return {
                ...state,
                [action.payload.name]: action.payload.value,
            }
        default:
            return state
    }
}

export const testsReducer = (
    state: IValueTest[],
    action: IAction
): IValueTest[] => {
    switch (action.type) {
        case FORM_ACTIONS.SET_TESTS:
            if (IsFunction(action.payload.tests)) {
                return action.payload.tests(state)
            }

            return action.payload.tests
        default:
            return state
    }
}

export const touchedReducer = (state: ITouched, action: IAction): ITouched => {
    switch (action.type) {
        case FORM_ACTIONS.SET_TOUCHED:
            if (IsFunction(action.payload.touched)) {
                return action.payload.touched(state)
            }

            return action.payload.touched
        case FORM_ACTIONS.SET_TOUCHED_FIELD: {
            const { name, value = true } = action.payload

            let newTouched = state

            if (value && state.indexOf(name) === -1) {
                newTouched = [...state, name]
            } else if (!value && state.indexOf(name) > -1) {
                newTouched = state.filter((_n) => _n !== name)
            }

            return newTouched
        }
        default:
            return state
    }
}

export const errorsReducer = (state: IErrors, action: IAction): IErrors => {
    switch (action.type) {
        case FORM_ACTIONS.SET_ERRORS:
            if (IsFunction(action.payload.errors)) {
                return action.payload.errors(state)
            }

            return action.payload.errors
        default:
            return state
    }
}

export const customErrorsReducer = (
    state: IErrors,
    action: IAction
): IErrors => {
    switch (action.type) {
        case FORM_ACTIONS.SET_CUSTOM_ERRORS:
            if (IsFunction(action.payload.errors)) {
                return action.payload.errors(state)
            }

            return action.payload.errors
        case FORM_ACTIONS.SET_CUSTOM_ERROR_FIELD: {
            const { name, value } = action.payload as {
                name: string
                value: IError
            }

            return { ...state, [name]: value }
        }
        default:
            return state
    }
}

export const fieldsReducer = (state: IFields, action: IAction): IFields => {
    switch (action.type) {
        case FORM_ACTIONS.SET_FIELDS:
            if (IsFunction(action.payload.fields)) {
                return action.payload.fields(state)
            }

            return action.payload.fields
        default:
            return state
    }
}

export const validateReducer = (
    state: ValidateFunction,
    action: IAction
): ValidateFunction => {
    switch (action.type) {
        case FORM_ACTIONS.SET_VALIDATE:
            if (!action.payload.validate) {
                return getFormErrors
            }

            return action.payload.validate
        default:
            return state
    }
}

export const isSendingReducer = (state: boolean, action: IAction): boolean => {
    switch (action.type) {
        case FORM_ACTIONS.SET_IS_SENDING:
            return Boolean(action.payload)
        default:
            return state
    }
}

export const isCancelingReducer = (
    state: boolean,
    action: IAction
): boolean => {
    switch (action.type) {
        case FORM_ACTIONS.SET_IS_CANCELING:
            return Boolean(action.payload)
        default:
            return state
    }
}

export const isSuccessReducer = (state: boolean, action: IAction): boolean => {
    switch (action.type) {
        case FORM_ACTIONS.SET_IS_SUCCESS:
            return Boolean(action.payload)
        default:
            return state
    }
}

export const sendErrorReducer = (state: any, action: IAction) => {
    switch (action.type) {
        case FORM_ACTIONS.SET_SEND_ERROR:
            return action.payload || null
        default:
            return state
    }
}

export const formReducer = (state: IFormState, action: IAction): IFormState => {
    const nextState = {
        ...state,
        values: valuesReducer(state.values, action),
        fields: fieldsReducer(state.fields, action),
        tests: testsReducer(state.tests, action),
        touched: touchedReducer(state.touched, action),
        errors: errorsReducer(state.errors, action),
        customErrors: customErrorsReducer(state.customErrors, action),
        validate: validateReducer(state.validate, action),
        isSending: isSendingReducer(state.isSending, action),
        isCanceling: isCancelingReducer(state.isCanceling, action),
        isSuccess: isSuccessReducer(state.isSuccess, action),
        sendError: sendErrorReducer(state.sendError, action),
    }

    return nextState
}

export default formReducer
