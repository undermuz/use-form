import { IFormState, IErrors, ITouched, IValues, IValueTest, ValidateFunction } from './reducer.js';
import { IStore, DispatchFunction } from '../useReducer/index.js';

interface IUseFormSettings {
    [k: string]: any;
    debug?: boolean;
}
declare const isFormHasErrors: (settings: IUseFormSettings, store: IStore<IFormState>, checkOnlyFilled?: boolean) => [boolean, IErrors];
declare const useIsFormValid: (settings: IUseFormSettings, store: IStore<IFormState>, _dispatch: DispatchFunction) => (checkOnlyFilled?: boolean) => boolean;
declare const useSetTouched: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newTouched: ITouched, silent?: boolean, checkOnlyFilled?: boolean) => void;
declare const useSetValues: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newValues: IValues, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
declare const useSetTests: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newTests: IValueTest[], silent?: boolean, checkOnlyFilled?: boolean) => void;
declare const useSetErrors: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newErrors: IErrors) => void;
declare const useSetFieldValue: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (name: string, value: any, silent?: boolean, checkOnlyFilled?: boolean, type?: string) => void;
declare const useSetFieldTouched: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (name: string, value?: boolean, silent?: boolean) => void;
declare const useSetValidate: (_settings: IUseFormSettings, _store: IStore<IFormState>, dispatch: DispatchFunction) => (newValidate: ValidateFunction, silent?: boolean, checkOnlyFilled?: boolean) => void;

export { IUseFormSettings, isFormHasErrors, useIsFormValid, useSetErrors, useSetFieldTouched, useSetFieldValue, useSetTests, useSetTouched, useSetValidate, useSetValues };
