import {
    type FieldValidator,
    type IErrors,
    type IFields,
    type IFormState,
    type IValues,
    type IValueTest,
    type ValidateFunction,
} from "./reducer"

import type { DispatchFunction, IStore, StoreMiddleware } from "../utils/useReducer"
import { useControlledForm } from "./useControlledForm"
import { useFormCore } from "./useFormCore"
import type { IUseFormControl, SendFunction } from "./useFormControl"
import { useFormState, type FormState } from "./useFormState"
import { useFormConfigBySettings } from "./useFormConfigBySettings"
import { useFormOnError } from "./events/useFormOnError"
import type { IUseIsFormSettings } from "./helpers"

export interface IInitialFormConfig<T extends IValues = IValues> {
    initialValues: T
    valueTests: IValueTest<T>[]
    fields: IFields
    validate?: ValidateFunction
}

/** Store middleware for form state (same shape as Redux middleware). */
export type FormMiddleware<T extends IValues = IValues> = StoreMiddleware<
    IFormState<T>
>

export interface IFormConfig<T extends IValues = IValues>
    extends Partial<IInitialFormConfig<T>>,
        IUseIsFormSettings {
    middlewares?: FormMiddleware<T>[]
}

export interface IUseForm<T extends IValues = IValues> {
    /**
     * @deprecated
     */
    IsFormValid: (c: boolean) => boolean
    isFormValid: (c: boolean) => boolean
    hasFormErrors: (c: boolean) => [boolean, IErrors<T>]
    getErrors: () => IErrors<T>
    store: IStore<IFormState<T>>
    dispatch: DispatchFunction
    send: SendFunction<T>
    reset: () => void
}

export type UseFormConfig<T extends Record<string, unknown> = IValues> =
    IUseForm<T> &
        Omit<IFormState<T>, "validate"> &
        IUseFormControl<T> & { config: IFormConfig<T> }

/** Field rule validator; same contract as {@link FieldValidator}. */
export type UseFormFieldRuleFunction<T extends IValues = IValues> =
    FieldValidator<T>

export type IUseFormFieldRule<T extends IValues = IValues> = [
    UseFormFieldRuleFunction<T>[],
    string?
]
export interface IUseFormField<
    V = unknown,
    T extends IValues = IValues
> {
    label: string
    initialValue?: V
    rules?: IUseFormFieldRule<T>[]
}

export type TypeUseFormField = IUseFormField | string

export type FormSettingsTypeFields = Record<string, TypeUseFormField>

/**
 * Infers form values shape from a `fields` config.
 * Uses each field's `initialValue` type; string shorthand fields become `unknown`.
 */
export type InferFieldValue<Field> = Field extends string
    ? unknown
    : Field extends { initialValue: infer V }
    ? V
    : unknown

export type InferValuesFromFields<F extends FormSettingsTypeFields> = {
    [K in keyof F]: InferFieldValue<F[K]>
}

/** Field config constrained by an explicit values type. */
export type FieldsForValues<T extends IValues> = {
    [K in keyof T]: IUseFormField<T[K], T> | string
}

export interface IUseFormSettings<
    F extends FormSettingsTypeFields = FormSettingsTypeFields
> {
    fields: F
    value?: InferValuesFromFields<F>
    onChange?: (v: InferValuesFromFields<F>) => void
    onError?: (v: IErrors<InferValuesFromFields<F>>) => void
    options?: IFormConfig<InferValuesFromFields<F>>
}

/** Settings when values type is provided explicitly via `useForm<MyValues>(...)`. */
export interface IUseFormSettingsForValues<T extends IValues> {
    fields: FieldsForValues<T>
    value?: T
    onChange?: (v: T) => void
    onError?: (v: IErrors<T>) => void
    options?: IFormConfig<T>
}

export function useFormCoreParams<F extends FormSettingsTypeFields>(
    formSettings: IUseFormSettings<F>
): [IFormConfig<InferValuesFromFields<F>>, FormState<InferValuesFromFields<F>>]
export function useFormCoreParams<T extends IValues>(
    formSettings: IUseFormSettingsForValues<T>
): [IFormConfig<T>, FormState<T>]
export function useFormCoreParams(
    formSettings: IUseFormSettings | IUseFormSettingsForValues<IValues>
): [IFormConfig, FormState] {
    const formConfig = useFormConfigBySettings(
        formSettings as IUseFormSettings
    )
    const formState = useFormState(formConfig)

    return [formConfig, formState]
}

export function useForm<F extends FormSettingsTypeFields>(
    formSettings: IUseFormSettings<F>
): UseFormConfig<InferValuesFromFields<F>>
export function useForm<T extends IValues>(
    formSettings: IUseFormSettingsForValues<T>
): UseFormConfig<T>
export function useForm(
    formSettings: IUseFormSettings | IUseFormSettingsForValues<IValues>
): UseFormConfig {
    const [formConfig, formState] = useFormCoreParams(
        formSettings as IUseFormSettings
    )

    const form = useFormCore(formConfig, formState)

    useControlledForm(form, formSettings as IUseFormSettings)
    useFormOnError(form, formSettings as IUseFormSettings)

    return form
}
