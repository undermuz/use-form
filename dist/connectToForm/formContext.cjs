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

// src/connectToForm/formContext.ts
var formContext_exports = {};
__export(formContext_exports, {
  default: () => formContext_default,
  defaultValidate: () => defaultValidate,
  useFormContext: () => useFormContext
});
module.exports = __toCommonJS(formContext_exports);
var import_react = require("react");
var import_useForm = require("../useForm/index.cjs");
var import_validate = require("../useForm/middlewares/validate.cjs");
var import_reducer = require("../useForm/reducer.cjs");
var defaultValidate = ({ errors = {} }) => errors;
var DEF_VALUES = {
  status: import_reducer.EnumFormStatus.Initial,
  values: {},
  isSending: false,
  isCanceling: false,
  isSuccess: false,
  sendError: null,
  tests: [],
  validate: import_validate.getFormErrors,
  touched: [],
  fields: [],
  errors: {},
  send: () => {
    return Promise.resolve();
  },
  isFormValid: (_c) => {
    return true;
  },
  IsFormValid: (_c) => {
    return true;
  },
  setValue: (_name, _value, _silent, _checkOnlyFilled, _type) => {
  },
  setTouchedByName: (_name, _value, _silent) => {
  },
  setTouched: (_newTouched, _silent, _checkOnlyFilled) => {
  },
  setValues: (_newValues, _silent, _checkOnlyFilled, _type) => {
  },
  setTests: (_newTests, _silent, _checkOnlyFilled) => {
  },
  setValidate: (_newValidate, _silent, _checkOnlyFilled) => {
  },
  setErrors: (_newErrors) => {
  },
  store: {
    getState: () => {
      return (0, import_useForm.getInitialState)();
    },
    dispatch: (..._args) => {
    }
  },
  dispatch: (..._args) => {
  }
};
var FormContext = (0, import_react.createContext)(DEF_VALUES);
FormContext.displayName = "FormContext";
var useFormContext = () => {
  const ctx = (0, import_react.useContext)(FormContext);
  if (!ctx) {
    throw new Error("You must wrap your component in form provider");
  }
  return ctx;
};
var formContext_default = FormContext;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultValidate,
  useFormContext
});
