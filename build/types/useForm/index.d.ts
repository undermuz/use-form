import { IErrors, IFields, IFormState, ITouched, IValues, IValueTest, ValidateFunction } from "./reducer";
import { DispatchFunction, IStore } from "../useReducer/index";
export interface IInitialStateOptions {
    initialValues: IValues;
    valueTests: IValueTest[];
    fields: IFields;
    validate?: Function;
}
export declare const getInitialState: (props?: IInitialStateOptions) => IFormState;
export interface IUseFormOptions extends IInitialStateOptions {
    middlewares?: any[];
}
export interface IUseFormControl {
    setValue: (name: string, value: any, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
    setTouchedByName: (name: string, value?: boolean, silent?: boolean) => void;
    setTouched: (newTouched: ITouched, silent?: boolean, checkOnlyFilled?: boolean) => void;
    setValues: (newValues: IValues, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
    setTests: (newTests: IValueTest[], silent?: boolean, checkOnlyFilled?: boolean) => void;
    setValidate: (newValidate: ValidateFunction, silent?: boolean, checkOnlyFilled?: boolean) => void;
    setErrors: (newErrors: IErrors) => void;
}
export declare const useFormControl: (props: IUseFormOptions, store: IStore<IFormState>, dispatch: DispatchFunction) => IUseFormControl;
export declare type SendFunction = (api: Function) => Promise<any>;
export interface IUseForm {
    IsFormValid: (c: boolean) => boolean;
    store: IStore<IFormState>;
    dispatch: DispatchFunction;
    send: SendFunction;
}
export declare type UseFormConfig = IUseForm & IFormState & IUseFormControl;
export declare type IUseFormFieldRule = [Array<Function>, string?];
export interface IUseFormField {
    label: string;
    initialValue?: string;
    rules?: IUseFormFieldRule[];
}
export declare type TypeUseFormField = IUseFormField | string;
export interface IUseFormSettings {
    fields: Record<string, TypeUseFormField>;
    options?: IUseFormOptions;
}
declare const useForm: (props: IUseFormSettings) => UseFormConfig;
export default useForm;
