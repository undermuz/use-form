import { DispatchFunction, IAction, IStore } from "../../useReducer";
import { IUseFormSettings } from "../helpers";
import { IFormState } from "../reducer";
declare const createSend: (settings: IUseFormSettings) => (store: IStore<IFormState>) => (next: DispatchFunction) => (action: IAction) => Promise<void | {
    response: any;
    values: import("../reducer").IValues;
}>;
export default createSend;
