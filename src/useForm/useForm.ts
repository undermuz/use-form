import {
    type IErrors,
    type IFields,
    type IFormState,
    type IValues,
    type IValueTest,
    type ValidateFunction,
} from "./reducer"

import type { DispatchFunction, IStore } from "../utils/useReducer"
import useControlledForm from "./useControlledForm"
import useFormCore from "./useFormCore"
import type { IUseFormControl, SendFunction } from "./useFormControl"
import useFormState, { type FormState } from "./useFormState"
import useFormConfigBySettings from "./useFormConfigBySettings"
import useFormOnError from "./events/useFormOnError"

export interface IInitialFormConfig {
    initialValues: IValues
    valueTests: IValueTest[]
    fields: IFields
    validate?: ValidateFunction
}

export interface IFormConfig extends Partial<IInitialFormConfig> {
    middlewares?: any[]
    debug?: boolean
}

export interface IUseForm {
    /**
     * @deprecated
     */
    IsFormValid: (c: boolean) => boolean
    isFormValid: (c: boolean) => boolean
    store: IStore<IFormState>
    dispatch: DispatchFunction
    send: SendFunction
}

export type UseFormConfig = IUseForm & IFormState & IUseFormControl

export type UseFormFieldRuleFunction = (v: unknown) => boolean

export type IUseFormFieldRule = [UseFormFieldRuleFunction[], string?]
export interface IUseFormField {
    label: string
    initialValue?: string
    rules?: IUseFormFieldRule[]
}

export type TypeUseFormField = IUseFormField | string

export type FormSettingsTypeFields = Record<string, TypeUseFormField>

export interface IUseFormSettings {
    fields: FormSettingsTypeFields
    value?: IValues
    onChange?: (v: IValues) => void
    onError?: (v: IErrors) => void
    options?: IFormConfig
}

export const useFormCoreParams = (
    formSettings: IUseFormSettings
): [IFormConfig, FormState] => {
    const formConfig = useFormConfigBySettings(formSettings)
    const formState = useFormState(formConfig)

    return [formConfig, formState]
}

const useForm = (formSettings: IUseFormSettings) => {
    const [formConfig, formState] = useFormCoreParams(formSettings)

    const form = useFormCore(formConfig, formState)

    useControlledForm(form, formSettings)
    useFormOnError(form, formSettings)

    return form
}

export default useForm
