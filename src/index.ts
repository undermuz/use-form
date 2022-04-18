import useForm, {
    IInitialStateOptions,
    SendFunction,
    IUseForm,
    UseFormConfig,
    IUseFormOptions,
} from "./useForm"

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

import FormContext, { useFormContext } from "./connectToForm/formContext"
import ConnectToForm from "./connectToForm"

export default useForm

export {
    FormContext,
    ConnectToForm,
    useFormContext,
    IUseFormOptions,
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
    SendFunction,
    IUseForm,
    UseFormConfig,
}
