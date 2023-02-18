import { IStore, DispatchFunction, IAction } from '../../useReducer/index.js';
import { IUseFormSettings } from '../helpers.js';
import { IFormState, IErrors } from '../reducer.js';

declare const getFormErrors: (state: IFormState, debug?: boolean) => IErrors;
declare const createValidating: (settings?: IUseFormSettings) => (store: IStore<IFormState>) => (next: DispatchFunction) => (action: IAction) => void;

export { createValidating as default, getFormErrors };
