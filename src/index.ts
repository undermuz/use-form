import { useFormCoreParams, useForm } from "./useForm/useForm"
import { useFormCore } from "./useForm/useFormCore"
import { useFormState } from "./useForm/useFormState"

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
    useReducer,
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
    FORM_ACTIONS,
} from "./useForm/reducer"

export { FormContext, useFormContext } from "./components/form-context"

export {
    ConnectToForm,
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

export { IfForm, type IIfFormProps } from "./utils/ifForm"

export { FormSubmit, EnumFormSubmitStatus } from "./components/form-submit"

export { useForm, useFormState, useFormCore, useFormCoreParams }

export default useForm
