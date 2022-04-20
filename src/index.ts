import useForm from "./useForm/index"

export {
    IInitialStateOptions,
    SendFunction,
    IUseForm,
    UseFormConfig,
    IUseFormOptions,
} from "./useForm/index"

export {
    default as useReducer,
    IActionPayload,
    IAction,
    DispatchFunction,
    IStore,
} from "./useReducer/index"

export {
    IValueTest,
    IFields,
    ITouched,
    IValues,
    EnumFormStatus,
    IFormState,
} from "./useForm/reducer"

export {
    default as FormContext,
    useFormContext,
} from "./connectToForm/formContext"

export { default as ConnectToForm } from "./connectToForm/index"

export {
    useIsFormSuccess,
    useIsFormCanceling,
    useIsFormSending,
    useIsFormHasErrors,
    useFormFields,
    useFormErrors,
    useFormSubmit,
} from "./utils"

export { default as IfForm, IIfFormProps } from "./ifForm/index"
export { default as FormSubmit, EnumFormSubmitStatus } from "./formSubmit/index"

export default useForm
