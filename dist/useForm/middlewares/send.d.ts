import { IStore, DispatchFunction, IAction } from '../../useReducer/index.js';
import { IUseIsFormSettings } from '../helpers.js';
import { IFormState } from '../reducer.js';

declare const createSend: (settings: IUseIsFormSettings) => (store: IStore<IFormState>) => (next: DispatchFunction) => (action: IAction) => Promise<void>;

export { createSend as default };
