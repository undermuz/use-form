import { IValues, IValueTest, IFields, ValidateFunction, IFormState, ITouched, IErrors } from './reducer.js';
import { IStore, DispatchFunction } from '../useReducer/index.js';

interface IInitialStateOptions {
    initialValues: IValues;
    valueTests: IValueTest[];
    fields: IFields;
    validate?: ValidateFunction;
}
declare const getInitialState: (props?: Partial<IInitialStateOptions>) => IFormState;
interface IUseFormOptions extends Partial<IInitialStateOptions> {
    middlewares?: any[];
    debug?: boolean;
}
interface IUseFormControl {
    setValue: (name: string, value: any, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
    setTouchedByName: (name: string, value?: boolean, silent?: boolean) => void;
    setTouched: (newTouched: ITouched, silent?: boolean, checkOnlyFilled?: boolean) => void;
    setValues: (newValues: IValues, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
    setTests: (newTests: IValueTest[], silent?: boolean, checkOnlyFilled?: boolean) => void;
    setValidate: (newValidate: ValidateFunction, silent?: boolean, checkOnlyFilled?: boolean) => void;
    setErrors: (newErrors: IErrors) => void;
}
declare const useFormControl: (props: IUseFormOptions, store: IStore<IFormState>, dispatch: DispatchFunction) => IUseFormControl;
declare type SendFunction = (api: Function) => Promise<any>;
interface IUseForm {
    /**
     * @deprecated
     */
    IsFormValid: (c: boolean) => boolean;
    isFormValid: (c: boolean) => boolean;
    store: IStore<IFormState>;
    dispatch: DispatchFunction;
    send: SendFunction;
}
declare type UseFormConfig = IUseForm & IFormState & IUseFormControl;
declare type IUseFormFieldRule = [Function[], string?];
interface IUseFormField {
    label: string;
    initialValue?: string;
    rules?: IUseFormFieldRule[];
}
declare type TypeUseFormField = IUseFormField | string;
declare type FormSettingsTypeFields = Record<string, TypeUseFormField>;
interface IUseFormSettings {
    fields: FormSettingsTypeFields;
    value?: IValues;
    onChange?: (v: IValues) => void;
    options?: IUseFormOptions;
}
declare const useForm: (props: IUseFormSettings) => UseFormConfig;

export { FormSettingsTypeFields, IInitialStateOptions, IUseForm, IUseFormControl, IUseFormField, IUseFormFieldRule, IUseFormOptions, IUseFormSettings, SendFunction, TypeUseFormField, UseFormConfig, useForm as default, getInitialState, useFormControl };
