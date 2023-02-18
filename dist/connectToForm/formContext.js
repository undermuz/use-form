// src/connectToForm/formContext.ts
import { createContext, useContext } from "react";
import { getInitialState } from "../useForm/index.js";
import { getFormErrors } from "../useForm/middlewares/validate.js";
import { EnumFormStatus } from "../useForm/reducer.js";
var defaultValidate = ({ errors = {} }) => errors;
var DEF_VALUES = {
  status: EnumFormStatus.Initial,
  values: {},
  isSending: false,
  isCanceling: false,
  isSuccess: false,
  sendError: null,
  tests: [],
  validate: getFormErrors,
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
      return getInitialState();
    },
    dispatch: (..._args) => {
    }
  },
  dispatch: (..._args) => {
  }
};
var FormContext = createContext(DEF_VALUES);
FormContext.displayName = "FormContext";
var useFormContext = () => {
  const ctx = useContext(FormContext);
  if (!ctx) {
    throw new Error("You must wrap your component in form provider");
  }
  return ctx;
};
var formContext_default = FormContext;
export {
  formContext_default as default,
  defaultValidate,
  useFormContext
};
