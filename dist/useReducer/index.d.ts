interface IActionPayload {
    [k: string]: any;
}
interface IAction {
    [k: string]: any;
    type: string | number;
    payload: IActionPayload | any;
}
declare type DispatchFunction = (action: IAction) => void;
interface IStore<T> {
    getState: () => T;
    dispatch: DispatchFunction;
}
declare const useReducer: <T>(reducer: (s: T, a: IAction) => T, initialState: T, middlewares?: any[]) => [T, DispatchFunction, IStore<T>];

export { DispatchFunction, IAction, IActionPayload, IStore, useReducer as default };
