import {
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
import useFormState from "./useFormState"

export interface IInitialStateOptions {
    initialValues: IValues
    valueTests: IValueTest[]
    fields: IFields
    validate?: ValidateFunction
}

export interface IUseFormOptions extends Partial<IInitialStateOptions> {
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
    options?: IUseFormOptions
}

const useForm = (formSettings: IUseFormSettings) => {
    const formState = useFormState(formSettings)

    const form = useFormCore(formSettings, formState)

    useControlledForm(form, formSettings)

    return form
}

export default useForm
