"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useReducer/index.ts
var useReducer_exports = {};
__export(useReducer_exports, {
  default: () => useReducer_default
});
module.exports = __toCommonJS(useReducer_exports);
var import_react = require("react");
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
  const [state, setState] = (0, import_react.useState)(initialState);
  const draftState = (0, import_react.useRef)(initialState);
  const dispatch = (0, import_react.useCallback)((action) => {
    draftState.current = reducer(draftState.current, action);
    setState(draftState.current);
    return action;
  }, []);
  const enhancedDispatch = (0, import_react.useMemo)(() => {
    const store2 = {
      getState: () => draftState.current,
      dispatch: (...args) => _enhancedDispatch(...args)
    };
    const chain = middlewares.map((middleware) => middleware(store2));
    const _enhancedDispatch = compose(...chain)(dispatch);
    return _enhancedDispatch;
  }, []);
  const store = (0, import_react.useMemo)(() => {
    return {
      getState: () => draftState.current,
      dispatch: (...args) => enhancedDispatch(...args)
    };
  }, []);
  return [state, enhancedDispatch, store];
};
var useReducer_default = useReducer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
