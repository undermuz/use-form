export interface IActionPayload {
    [k: string]: any;
}
export interface IAction {
    [k: string]: any;
    type: string | number;
    payload: IActionPayload | any;
}
export declare type DispatchFunction = (action: IAction) => void;
export interface IStore<T> {
    getState: () => T;
    dispatch: DispatchFunction;
}
declare const useReducer: <T>(reducer: (s: T, a: IAction) => T, initialState: T, middlewares?: any[]) => [T, DispatchFunction, IStore<T>];
export default useReducer;
