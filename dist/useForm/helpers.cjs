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

// src/useForm/helpers.ts
var helpers_exports = {};
__export(helpers_exports, {
  isFormHasErrors: () => isFormHasErrors,
  useIsFormValid: () => useIsFormValid,
  useSetErrors: () => useSetErrors,
  useSetFieldTouched: () => useSetFieldTouched,
  useSetFieldValue: () => useSetFieldValue,
  useSetTests: () => useSetTests,
  useSetTouched: () => useSetTouched,
  useSetValidate: () => useSetValidate,
  useSetValues: () => useSetValues
});
module.exports = __toCommonJS(helpers_exports);
var import_react = require("react");
var import_reducer = require("./reducer.cjs");
var isFormHasErrors = (settings, store, checkOnlyFilled = true) => {
  const { debug } = settings;
  const state = store.getState();
  const { validate, touched, fields } = state;
  const newErrors = validate(
    {
      ...state,
      touched: checkOnlyFilled ? touched : Object.keys(fields)
    },
    debug
  );
  return [Object.keys(newErrors).length > 0, newErrors];
};
var useIsFormValid = (settings, store, _dispatch) => {
  return (0, import_react.useCallback)((checkOnlyFilled = true) => {
    return !isFormHasErrors(settings, store, checkOnlyFilled)[0];
  }, []);
};
var useSetTouched = (_settings, _store, dispatch) => {
  return (0, import_react.useCallback)(
    (newTouched, silent = false, checkOnlyFilled = true) => {
      dispatch({
        type: import_reducer.SET_TOUCHED,
        payload: { touched: newTouched },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetValues = (_settings, _store, dispatch) => {
  return (0, import_react.useCallback)(
    (newValues, silent = false, checkOnlyFilled = true, type = "system") => {
      dispatch({
        type: import_reducer.SET_VALUES,
        payload: { values: newValues, type },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetTests = (_settings, _store, dispatch) => {
  return (0, import_react.useCallback)(
    (newTests, silent = false, checkOnlyFilled = true) => {
      dispatch({
        type: import_reducer.SET_TESTS,
        payload: { tests: newTests },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetErrors = (_settings, _store, dispatch) => {
  return (0, import_react.useCallback)((newErrors) => {
    dispatch({
      type: import_reducer.SET_ERRORS,
      payload: { errors: newErrors }
    });
  }, []);
};
var useSetFieldValue = (_settings, _store, dispatch) => {
  return (0, import_react.useCallback)(
    (name, value, silent = false, checkOnlyFilled = true, type = "system") => {
      dispatch({
        type: import_reducer.SET_VALUE,
        payload: { name, value, type },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetFieldTouched = (_settings, _store, dispatch) => {
  return (0, import_react.useCallback)(
    (name, value = true, silent = false) => {
      dispatch({
        type: import_reducer.SET_TOUCHED_FIELD,
        payload: {
          name,
          value
        },
        silent
      });
    },
    []
  );
};
var useSetValidate = (_settings, _store, dispatch) => {
  return (0, import_react.useCallback)(
    (newValidate, silent = false, checkOnlyFilled = true) => {
      dispatch({
        type: import_reducer.SET_VALIDATE,
        payload: newValidate,
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFormHasErrors,
  useIsFormValid,
  useSetErrors,
  useSetFieldTouched,
  useSetFieldValue,
  useSetTests,
  useSetTouched,
  useSetValidate,
  useSetValues
});
