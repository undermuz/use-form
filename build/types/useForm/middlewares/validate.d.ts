import { DispatchFunction, IAction, IStore } from "../../useReducer";
import { IUseFormSettings } from "../helpers";
import { IFormState } from "../reducer";
export declare const getFormErrors: (state: IFormState, debug?: boolean) => {};
declare const createValidating: (settings?: IUseFormSettings) => (store: IStore<IFormState>) => (next: DispatchFunction) => (action: IAction) => void;
export default createValidating;
