import { IErrors, IFormState, ITouched, IValues, IValueTest, ValidateFunction } from "./reducer";
import { DispatchFunction, IStore } from "../useReducer/index";
export interface IUseFormSettings {
    [k: string]: any;
    debug?: boolean;
}
export declare const isFormHasErrors: (settings: IUseFormSettings, store: IStore<IFormState>, checkOnlyFilled?: boolean) => any[];
export declare const useIsFormValid: (settings: IUseFormSettings, store: IStore<IFormState>, _dispatch: DispatchFunction) => (checkOnlyFilled?: boolean) => boolean;
export declare const useSetTouched: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newTouched: ITouched, silent?: boolean, checkOnlyFilled?: boolean) => void;
export declare const useSetValues: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newValues: IValues, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
export declare const useSetTests: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newTests: IValueTest[], silent?: boolean, checkOnlyFilled?: boolean) => void;
export declare const useSetErrors: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newErrors: IErrors) => void;
export declare const useSetFieldValue: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (name: string, value: any, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
export declare const useSetFieldTouched: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (name: string, value?: boolean, silent?: boolean) => void;
export declare const useSetValidate: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newValidate: ValidateFunction, silent?: boolean, checkOnlyFilled?: boolean) => void;
