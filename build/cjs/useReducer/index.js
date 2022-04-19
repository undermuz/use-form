"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function compose(...fns) {
    if (fns.length === 0)
        return (arg) => arg;
    if (fns.length === 1)
        return fns[0];
    return fns.reduce((a, b) => (...args) => a(b(...args)));
}
const useReducer = (reducer, initialState, middlewares = []) => {
    const [state, setState] = (0, react_1.useState)(initialState);
    const draftState = (0, react_1.useRef)(initialState);
    const dispatch = (0, react_1.useCallback)((action) => {
        draftState.current = reducer(draftState.current, action);
        setState(draftState.current);
        return action;
    }, []);
    const enhancedDispatch = (0, react_1.useMemo)(() => {
        const store = {
            getState: () => draftState.current,
            dispatch: (...args) => _enhancedDispatch(...args),
        };
        const chain = middlewares.map((middleware) => middleware(store));
        const _enhancedDispatch = compose(...chain)(dispatch);
        return _enhancedDispatch;
    }, []);
    const store = (0, react_1.useMemo)(() => {
        return {
            getState: () => draftState.current,
            dispatch: (...args) => enhancedDispatch(...args),
        };
    }, []);
    return [state, enhancedDispatch, store];
};
exports.default = useReducer;
