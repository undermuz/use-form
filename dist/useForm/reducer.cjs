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

// src/useForm/reducer.ts
var reducer_exports = {};
__export(reducer_exports, {
  EnumFormStatus: () => EnumFormStatus,
  SEND_FORM: () => SEND_FORM,
  SET_ERRORS: () => SET_ERRORS,
  SET_FIELDS: () => SET_FIELDS,
  SET_IS_CANCELING: () => SET_IS_CANCELING,
  SET_IS_SENDING: () => SET_IS_SENDING,
  SET_IS_SUCCESS: () => SET_IS_SUCCESS,
  SET_SEND_ERROR: () => SET_SEND_ERROR,
  SET_TESTS: () => SET_TESTS,
  SET_TOUCHED: () => SET_TOUCHED,
  SET_TOUCHED_FIELD: () => SET_TOUCHED_FIELD,
  SET_VALIDATE: () => SET_VALIDATE,
  SET_VALUE: () => SET_VALUE,
  SET_VALUES: () => SET_VALUES,
  VALIDATE_FORM: () => VALIDATE_FORM,
  default: () => reducer_default,
  errorsReducer: () => errorsReducer,
  fieldsReducer: () => fieldsReducer,
  formReducer: () => formReducer,
  isCancelingReducer: () => isCancelingReducer,
  isSendingReducer: () => isSendingReducer,
  isSuccessReducer: () => isSuccessReducer,
  sendErrorReducer: () => sendErrorReducer,
  testsReducer: () => testsReducer,
  touchedReducer: () => touchedReducer,
  validateReducer: () => validateReducer,
  valuesReducer: () => valuesReducer
});
module.exports = __toCommonJS(reducer_exports);
var import_validate = require("./middlewares/validate.cjs");
var IsFunction = (value) => Boolean(value) && ["[object Function]", "[object AsyncFunction]"].includes(
  {}.toString.call(value)
);
var SET_VALUES = "set_values";
var SET_VALUE = "set_value";
var SET_TESTS = "set_tests";
var SET_TOUCHED_FIELD = "set_touched_field";
var SET_TOUCHED = "set_touched";
var SET_ERRORS = "set_errors";
var SET_FIELDS = "set_fields";
var SET_VALIDATE = "set_validate";
var SET_IS_SENDING = "set_is_sending";
var SET_IS_CANCELING = "set_is_canceling";
var SET_IS_SUCCESS = "set_is_success";
var SET_SEND_ERROR = "set_send_error";
var VALIDATE_FORM = "validate_form";
var SEND_FORM = "send_form";
var EnumFormStatus = /* @__PURE__ */ ((EnumFormStatus2) => {
  EnumFormStatus2["Initial"] = "initial";
  return EnumFormStatus2;
})(EnumFormStatus || {});
var valuesReducer = (state, action) => {
  switch (action.type) {
    case SET_VALUES:
      if (IsFunction(action.payload.values)) {
        return action.payload.values(state);
      }
      return action.payload.values;
    case SET_VALUE:
      if (IsFunction(action.payload.value)) {
        return {
          ...state,
          [action.payload.name]: action.payload.value(
            state[action.payload.name]
          )
        };
      }
      return {
        ...state,
        [action.payload.name]: action.payload.value
      };
    default:
      return state;
  }
};
var testsReducer = (state, action) => {
  switch (action.type) {
    case SET_TESTS:
      if (IsFunction(action.payload.tests)) {
        return action.payload.tests(state);
      }
      return action.payload.tests;
    default:
      return state;
  }
};
var touchedReducer = (state, action) => {
  switch (action.type) {
    case SET_TOUCHED:
      if (IsFunction(action.payload.touched)) {
        return action.payload.touched(state);
      }
      return action.payload.touched;
    case SET_TOUCHED_FIELD: {
      const { name, value = true } = action.payload;
      let newTouched = state;
      if (value && state.indexOf(name) === -1) {
        newTouched = [...state, name];
      } else if (!value && state.indexOf(name) > -1) {
        newTouched = state.filter((_n) => _n !== name);
      }
      return newTouched;
    }
    default:
      return state;
  }
};
var errorsReducer = (state, action) => {
  switch (action.type) {
    case SET_ERRORS:
      if (IsFunction(action.payload.errors)) {
        return action.payload.errors(state);
      }
      return action.payload.errors;
    default:
      return state;
  }
};
var fieldsReducer = (state, action) => {
  switch (action.type) {
    case SET_FIELDS:
      if (IsFunction(action.payload.fields)) {
        return action.payload.fields(state);
      }
      return action.payload.fields;
    default:
      return state;
  }
};
var validateReducer = (state, action) => {
  switch (action.type) {
    case SET_VALIDATE:
      if (!action.payload.validate) {
        return import_validate.getFormErrors;
      }
      return action.payload.validate;
    default:
      return state;
  }
};
var isSendingReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_SENDING:
      return Boolean(action.payload);
    default:
      return state;
  }
};
var isCancelingReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_CANCELING:
      return Boolean(action.payload);
    default:
      return state;
  }
};
var isSuccessReducer = (state, action) => {
  switch (action.type) {
    case SET_IS_SUCCESS:
      return Boolean(action.payload);
    default:
      return state;
  }
};
var sendErrorReducer = (state, action) => {
  switch (action.type) {
    case SET_SEND_ERROR:
      return action.payload || null;
    default:
      return state;
  }
};
var formReducer = (state, action) => {
  const nextState = {
    ...state,
    values: valuesReducer(state.values, action),
    fields: fieldsReducer(state.fields, action),
    tests: testsReducer(state.tests, action),
    touched: touchedReducer(state.touched, action),
    errors: errorsReducer(state.errors, action),
    validate: validateReducer(state.validate, action),
    isSending: isSendingReducer(state.isSending, action),
    isCanceling: isCancelingReducer(state.isCanceling, action),
    isSuccess: isSuccessReducer(state.isSuccess, action),
    sendError: sendErrorReducer(state.sendError, action)
  };
  return nextState;
};
var reducer_default = formReducer;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EnumFormStatus,
  SEND_FORM,
  SET_ERRORS,
  SET_FIELDS,
  SET_IS_CANCELING,
  SET_IS_SENDING,
  SET_IS_SUCCESS,
  SET_SEND_ERROR,
  SET_TESTS,
  SET_TOUCHED,
  SET_TOUCHED_FIELD,
  SET_VALIDATE,
  SET_VALUE,
  SET_VALUES,
  VALIDATE_FORM,
  errorsReducer,
  fieldsReducer,
  formReducer,
  isCancelingReducer,
  isSendingReducer,
  isSuccessReducer,
  sendErrorReducer,
  testsReducer,
  touchedReducer,
  validateReducer,
  valuesReducer
});
