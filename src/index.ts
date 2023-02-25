import useForm, { useFormCoreParams } from "./useForm/useForm"
import useFormCore from "./useForm/useFormCore"
import useFormState from "./useForm/useFormState"

export { type SendFunction } from "./useForm/useFormControl"

export {
    type IUseFormSettings,
    type IInitialStateOptions,
    type IUseForm,
    type UseFormConfig,
    type IUseFormOptions,
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
