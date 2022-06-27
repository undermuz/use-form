import { useState, useCallback, useRef, useMemo } from "react";
function compose() {
    var fns = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        fns[_i] = arguments[_i];
    }
    if (fns.length === 0)
        return function (arg) { return arg; };
    if (fns.length === 1)
        return fns[0];
    return fns.reduce(function (a, b) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return a(b.apply(void 0, args));
        };
    });
}
var useReducer = function (reducer, initialState, middlewares) {
    if (middlewares === void 0) { middlewares = []; }
    var _a = useState(initialState), state = _a[0], setState = _a[1];
    var draftState = useRef(initialState);
    var dispatch = useCallback(function (action) {
        draftState.current = reducer(draftState.current, action);
        setState(draftState.current);
        return draftState.current;
    }, []);
    var enhancedDispatch = useMemo(function () {
        var store = {
            getState: function () { return draftState.current; },
            dispatch: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _enhancedDispatch.apply(void 0, args);
            },
        };
        var chain = middlewares.map(function (middleware) { return middleware(store); });
        var _enhancedDispatch = compose.apply(void 0, chain)(dispatch);
        return _enhancedDispatch;
    }, []);
    var store = useMemo(function () {
        return {
            getState: function () { return draftState.current; },
            dispatch: function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return enhancedDispatch.apply(void 0, args);
            },
        };
    }, []);
    return [state, enhancedDispatch, store];
};
export default useReducer;
