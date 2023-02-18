// src/useReducer/index.ts
import { useState, useCallback, useRef, useMemo } from "react";
function compose(...fns) {
  if (fns.length === 0)
    return (arg) => arg;
  if (fns.length === 1)
    return fns[0];
  return fns.reduce(
    (a, b) => (...args) => a(b(...args))
  );
}
var useReducer = (reducer, initialState, middlewares = []) => {
  const [state, setState] = useState(initialState);
  const draftState = useRef(initialState);
  const dispatch = useCallback((action) => {
    draftState.current = reducer(draftState.current, action);
    setState(draftState.current);
    return action;
  }, []);
  const enhancedDispatch = useMemo(() => {
    const store2 = {
      getState: () => draftState.current,
      dispatch: (...args) => _enhancedDispatch(...args)
    };
    const chain = middlewares.map((middleware) => middleware(store2));
    const _enhancedDispatch = compose(...chain)(dispatch);
    return _enhancedDispatch;
  }, []);
  const store = useMemo(() => {
    return {
      getState: () => draftState.current,
      dispatch: (...args) => enhancedDispatch(...args)
    };
  }, []);
  return [state, enhancedDispatch, store];
};
var useReducer_default = useReducer;
export {
  useReducer_default as default
};
