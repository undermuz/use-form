import useForm, { useFormCoreParams } from "./useForm/useForm"
import useFormCore from "./useForm/useFormCore"
import useFormState from "./useForm/useFormState"

import {
    SET_VALUES,
    SET_VALUE,
    SET_TESTS,
    SET_TOUCHED_FIELD,
    SET_TOUCHED,
    SET_ERRORS,
    SET_FIELDS,
    SET_VALIDATE,
    SET_IS_SENDING,
    SET_IS_CANCELING,
    SET_IS_SUCCESS,
    SET_SEND_ERROR,
    VALIDATE_FORM,
    SEND_FORM,
} from "./useForm/reducer"

export const FORM_ACTIONS = {
    SET_VALUES,
    SET_VALUE,
    SET_TESTS,
    SET_TOUCHED_FIELD,
    SET_TOUCHED,
    SET_ERRORS,
    SET_FIELDS,
    SET_VALIDATE,
    SET_IS_SENDING,
    SET_IS_CANCELING,
    SET_IS_SUCCESS,
    SET_SEND_ERROR,
    VALIDATE_FORM,
    SEND_FORM,
}

export { type SendFunction } from "./useForm/useFormControl"

export {
    type UseFormFieldRuleFunction,
    type IUseFormSettings,
    type IInitialFormConfig as IInitialStateOptions,
    type IUseForm,
    type UseFormConfig,
    type IFormConfig as IUseFormOptions,
    type IUseFormFieldRule,
} from "./useForm/useForm"

export {
    default as useReducer,
    type IActionPayload,
    type IAction,
    type DispatchFunction,
    type IStore,
} from "./utils/useReducer"

export {
    type IValueTest,
    type IFields,
    type ITouched,
    type IValues,
    type IFormState,
    type IError,
    type IErrors,
    EnumFormStatus,
} from "./useForm/reducer"

export {
    default as FormContext,
    useFormContext,
} from "./components/form-context"

export {
    default as ConnectToForm,
    type IInputProps,
    type IConnectedProps,
} from "./components/connect-to-form"

export {
    useIsFormSuccess,
    useIsFormCanceling,
    useIsFormSending,
    useIsFormHasErrors,
    useFormFields,
    useFormErrors,
    useFormSubmit,
} from "./utils/common"

export { default as IfForm, type IIfFormProps } from "./utils/ifForm"

export {
    default as FormSubmit,
    EnumFormSubmitStatus,
} from "./components/form-submit"

export { useFormState, useFormCore, useFormCoreParams }

export default useForm
