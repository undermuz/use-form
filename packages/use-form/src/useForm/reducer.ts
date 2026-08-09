import type { IAction } from "../utils/useReducer"
import { getFormErrors } from "./middlewares/validate"

const payloadOf = <T>(action: IAction): T => action.payload as T

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

export type ValidateFunction = (
    formState: IFormState,
    debug?: boolean
) => IErrors

/** Runtime field labels map (name → label). */
export type IFields = Record<string, string>

export type IValues<
    T extends Record<string, unknown> = Record<string, unknown>
> = T

/** String keys of a form values type (field names). */
export type FieldName<T extends IValues = IValues> = keyof T & string

/**
 * Validator used by value tests / field rules.
 * Runtime always passes `(fieldValue, allValues)`.
 * One-arg functions (and `Boolean`) remain assignable.
 */
export type FieldValidator<T extends IValues = IValues> = (
    value: unknown,
    values: T
) => boolean

export type IValueTest<T extends IValues = IValues> = [
    Array<FieldName<T>>,
    Array<FieldValidator<T>>,
    string?
]

export type ITouched<T extends IValues = IValues> = Array<FieldName<T>>

export type IError = Array<string | IErrors>

export type IErrors<T extends IValues = IValues> = {
    [K in FieldName<T>]?: IError
}

export enum EnumFormStatus {
    Initial = "initial",
}

export interface IFormState<T extends IValues = IValues> {
    status: EnumFormStatus
    isSending: boolean
    isCanceling: boolean
    isSuccess: boolean
    sendError: unknown | null
    values: T
    tests: IValueTest<T>[]
    validate: ValidateFunction
    touched: ITouched<T>
    fields: IFields
    errors: IErrors<T>
    customErrors: IErrors<T>
}

export const valuesReducer = (state: IValues, action: IAction): IValues => {
    switch (action.type) {
        case FORM_ACTIONS.SET_VALUES: {
            const { values } = payloadOf<{
                values: IValues | ((prev: IValues) => IValues)
            }>(action)

            if (typeof values === "function") {
                return values(state)
            }

            return values
        }
        case FORM_ACTIONS.SET_VALUE: {
            const { name, value } = payloadOf<{
                name: string
                value: unknown
            }>(action)

            if (typeof value === "function") {
                return {
                    ...state,
                    [name]: (value as (prev: unknown) => unknown)(state[name]),
                }
            }

            return {
                ...state,
                [name]: value,
            }
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
        case FORM_ACTIONS.SET_TESTS: {
            const { tests } = payloadOf<{
                tests: IValueTest[] | ((prev: IValueTest[]) => IValueTest[])
            }>(action)

            if (typeof tests === "function") {
                return tests(state)
            }

            return tests
        }
        default:
            return state
    }
}

export const touchedReducer = (state: ITouched, action: IAction): ITouched => {
    switch (action.type) {
        case FORM_ACTIONS.SET_TOUCHED: {
            const { touched } = payloadOf<{
                touched: ITouched | ((prev: ITouched) => ITouched)
            }>(action)

            if (typeof touched === "function") {
                return touched(state)
            }

            return touched
        }
        case FORM_ACTIONS.SET_TOUCHED_FIELD: {
            const { name, value = true } = payloadOf<{
                name: string
                value?: boolean
            }>(action)

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
        case FORM_ACTIONS.SET_ERRORS: {
            const { errors } = payloadOf<{
                errors: IErrors | ((prev: IErrors) => IErrors)
            }>(action)

            if (typeof errors === "function") {
                return errors(state)
            }

            return errors
        }
        default:
            return state
    }
}

export const customErrorsReducer = (
    state: IErrors,
    action: IAction
): IErrors => {
    switch (action.type) {
        case FORM_ACTIONS.SET_CUSTOM_ERRORS: {
            const { errors } = payloadOf<{
                errors: IErrors | ((prev: IErrors) => IErrors)
            }>(action)

            if (typeof errors === "function") {
                return errors(state)
            }

            return errors
        }
        case FORM_ACTIONS.SET_CUSTOM_ERROR_FIELD: {
            const { name, value } = payloadOf<{
                name: string
                value: IError
            }>(action)

            return { ...state, [name]: value }
        }
        default:
            return state
    }
}

export const fieldsReducer = (state: IFields, action: IAction): IFields => {
    switch (action.type) {
        case FORM_ACTIONS.SET_FIELDS: {
            const { fields } = payloadOf<{
                fields: IFields | ((prev: IFields) => IFields)
            }>(action)

            if (typeof fields === "function") {
                return fields(state)
            }

            return fields
        }
        default:
            return state
    }
}

export const validateReducer = (
    state: ValidateFunction,
    action: IAction
): ValidateFunction => {
    switch (action.type) {
        case FORM_ACTIONS.SET_VALIDATE: {
            const payload = action.payload

            if (typeof payload === "function") {
                return payload as ValidateFunction
            }

            const { validate } = payloadOf<{
                validate?: ValidateFunction | null
            }>(action)

            if (!validate) {
                return getFormErrors
            }

            return validate
        }
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

export const sendErrorReducer = (
    state: unknown | null,
    action: IAction
): unknown | null => {
    switch (action.type) {
        case FORM_ACTIONS.SET_SEND_ERROR:
            return action.payload ?? null
        default:
            return state
    }
}

export const formReducer = <T extends IValues = IValues>(
    state: IFormState<T>,
    action: IAction
): IFormState<T> => {
    const nextState: IFormState<T> = {
        ...state,
        values: valuesReducer(state.values, action) as T,
        fields: fieldsReducer(state.fields, action),
        tests: testsReducer(
            state.tests as IValueTest[],
            action
        ) as IValueTest<T>[],
        touched: touchedReducer(state.touched, action) as ITouched<T>,
        errors: errorsReducer(state.errors, action) as IErrors<T>,
        customErrors: customErrorsReducer(
            state.customErrors,
            action
        ) as IErrors<T>,

        validate: validateReducer(state.validate, action),

        isSending: isSendingReducer(state.isSending, action),
        isCanceling: isCancelingReducer(state.isCanceling, action),
        isSuccess: isSuccessReducer(state.isSuccess, action),
        sendError: sendErrorReducer(state.sendError, action),
    }

    return nextState
}
