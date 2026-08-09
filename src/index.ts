import { useFormCoreParams, useForm } from "./useForm/useForm"
import { useFormCore } from "./useForm/useFormCore"
import { useFormState } from "./useForm/useFormState"

export {
    type SendFunction,
    type FormSendApi,
    type FormSendResult,
} from "./useForm/useFormControl"

export {
    type UseFormFieldRuleFunction,
    type IUseFormSettings,
    type IInitialFormConfig as IInitialStateOptions,
    type IUseForm,
    type UseFormConfig,
    type IFormConfig as IUseFormOptions,
    type IFormConfig,
    type FormMiddleware,
    type IUseFormFieldRule,
    type InferFieldValue,
    type InferValuesFromFields,
    type FieldsForValues,
    type IUseFormSettingsForValues,
    type FormSettingsTypeFields,
    type TypeUseFormField,
    type IUseFormField,
} from "./useForm/useForm"

export type { IUseIsFormSettings } from "./useForm/helpers"

export {
    useReducer,
    type IActionPayload,
    type IAction,
    type DispatchFunction,
    type IStore,
    type StoreMiddleware,
} from "./utils/useReducer"

export {
    type IValueTest,
    type FieldValidator,
    type IFields,
    type ITouched,
    type IValues,
    type IFormState,
    type IError,
    type IErrors,
    type FieldName,
    EnumFormStatus,
    FORM_ACTIONS,
} from "./useForm/reducer"

export { required, minLength, pattern } from "./useForm/validators"

export { FormContext, useFormContext } from "./components/form-context"

export {
    ConnectToForm,
    type IConnectToForm,
    type IConnectToFormElement,
    type IConnectToFormRender,
    type IInputProps,
    type IConnectedProps,
    type ConnectedValue,
} from "./components/connect-to-form"

export {
    useIsFormSuccess,
    useIsFormCanceling,
    useIsFormSending,
    useIsFormHasErrors,
    useFormFields,
    useFormErrors,
} from "./utils/common"

export {
    useFormSubmit,
    type FormSubmitError,
} from "./utils/useFormSubmit"

export { IfForm, type IIfFormProps } from "./utils/ifForm"

export {
    FormSubmit,
    EnumFormSubmitStatus,
    type IFormSubmitProps,
} from "./components/form-submit"

export { useForm, useFormState, useFormCore, useFormCoreParams }

export {
    FormValidateError,
    FormSendError,
    getFormApiErrorMeta,
    getErrorMessage,
    type FormServerErrorMeta,
    type FormApiErrorLike,
} from "./useForm/errors"

export {
    getFieldError,
    getFieldErrorMessages,
} from "./useForm/errorHelpers"

export default useForm
