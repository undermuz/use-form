import useForm, { IInitialStateOptions } from "./useForm"

import useReducer, {
    IActionPayload,
    IAction,
    DispatchFunction,
    IStore,
} from "./useReducer"

import {
    IValueTest,
    IFields,
    ITouched,
    IValues,
    EnumFormStatus,
    IFormState,
} from "./useForm/reducer"

export default useForm

export {
    IValueTest,
    IFields,
    ITouched,
    IValues,
    IInitialStateOptions,
    EnumFormStatus,
    IFormState,
    useReducer,
    IActionPayload,
    IAction,
    DispatchFunction,
    IStore,
}
