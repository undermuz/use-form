import useForm from "./useForm/index"

export {
    type IUseFormSettings,
    type IInitialStateOptions,
    type SendFunction,
    type IUseForm,
    type UseFormConfig,
    type IUseFormOptions,
    type IUseFormFieldRule,
} from "./useForm/index"

export {
    default as useReducer,
    type IActionPayload,
    type IAction,
    type DispatchFunction,
    type IStore,
} from "./useReducer/index"

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
} from "./connectToForm/formContext"

export {
    default as ConnectToForm,
    type IInputProps,
    type IConnectedProps,
} from "./connectToForm/index"

export {
    useIsFormSuccess,
    useIsFormCanceling,
    useIsFormSending,
    useIsFormHasErrors,
    useFormFields,
    useFormErrors,
    useFormSubmit,
} from "./utils/index"

export { default as IfForm, type IIfFormProps } from "./ifForm/index"
export { default as FormSubmit, EnumFormSubmitStatus } from "./formSubmit/index"

export default useForm
