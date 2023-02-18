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

// src/useForm/middlewares/validate.ts
var validate_exports = {};
__export(validate_exports, {
  default: () => validate_default,
  getFormErrors: () => getFormErrors
});
module.exports = __toCommonJS(validate_exports);
var import_reducer = require("../reducer.cjs");
var getFormErrors = (state, debug = false) => {
  const { tests } = state;
  let errors = {};
  debug = false;
  if (debug)
    console.log(`[useForm][getFormErrors]`, state);
  if (!(tests == null ? void 0 : tests.length)) {
    if (debug)
      console.log(`[useForm][getFormErrors][Tests are not set]`, state);
    return errors;
  }
  tests.forEach((test, index) => {
    const [names, testList, errorText] = test;
    if (debug)
      console.log(`[useForm][getFormErrors][Test #${index + 1}]`, {
        names,
        testList,
        errorText
      });
    names == null ? void 0 : names.forEach((name) => {
      let isError = false;
      if (state.touched.indexOf(name) > -1) {
        testList.forEach((valueTest) => {
          const value = state.values[name];
          if (debug)
            console.log(
              `[useForm][getFormErrors][Test #${index + 1}][${name}][Begin]`,
              {
                test: valueTest,
                value
              }
            );
          if (!valueTest(value)) {
            isError = true;
            if (debug)
              console.log(
                `[useForm][getFormErrors][Test #${index + 1}][${name}][Error: ${errorText}]`,
                {
                  test: valueTest,
                  value
                }
              );
          } else {
            if (debug)
              console.log(
                `[useForm][getFormErrors][Test #${index + 1}][${name}][Success]`
              );
          }
        });
      } else {
        if (debug)
          console.log(
            `[useForm][getFormErrors][Test #${index + 1}][${name}][Skip - isn't touched]`
          );
      }
      if (isError) {
        if (Object.keys(errors).indexOf(name) === -1) {
          errors[name] = [];
        }
        errors[name].push(errorText);
      }
    });
  });
  if (debug)
    console.log(
      `[useForm][getFormErrors][Errors: ${Object.keys(errors).length}]`,
      errors
    );
  return errors;
};
var createValidating = (settings = {}) => (store) => (next) => (action) => {
  const { debug = false } = settings;
  const result = next(action);
  if (action.type === import_reducer.SET_VALUE || action.type === import_reducer.SET_VALUES || action.type === import_reducer.SET_TESTS || action.type === import_reducer.SET_TOUCHED_FIELD || action.type === import_reducer.SET_TOUCHED || action.type === import_reducer.SET_FIELDS || action.type === import_reducer.SET_VALIDATE || action.type === import_reducer.VALIDATE_FORM) {
    const { silent = false, checkOnlyFilled = true } = action;
    if (!silent) {
      const state = store.getState();
      const { validate: customValidate = null } = action.payload;
      const validateFn = customValidate != null ? customValidate : state.validate;
      const newErrors = validateFn(
        {
          ...state,
          touched: checkOnlyFilled ? state.touched : Object.keys(state.fields)
        },
        debug
      );
      store.dispatch({
        type: import_reducer.SET_ERRORS,
        payload: { errors: newErrors }
      });
    }
  }
  return result;
};
var validate_default = createValidating;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFormErrors
});
