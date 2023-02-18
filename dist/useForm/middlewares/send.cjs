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

// src/useForm/middlewares/send.ts
var send_exports = {};
__export(send_exports, {
  default: () => send_default
});
module.exports = __toCommonJS(send_exports);
var import_errors = require("../errors.cjs");
var import_helpers = require("../helpers.cjs");
var import_reducer = require("../reducer.cjs");
var noop = () => {
};
var setIsSending = (value) => {
  return {
    type: import_reducer.SET_IS_SENDING,
    payload: value
  };
};
var setIsCanceling = (value) => {
  return {
    type: import_reducer.SET_IS_CANCELING,
    payload: value
  };
};
var setIsSuccess = (value) => {
  return {
    type: import_reducer.SET_IS_SUCCESS,
    payload: value
  };
};
var setErrors = (value) => {
  return {
    type: import_reducer.SET_ERRORS,
    payload: { errors: value }
  };
};
var setTouched = (value, silent = false) => {
  return {
    type: import_reducer.SET_TOUCHED,
    payload: { touched: value },
    silent
  };
};
var setSendError = (value) => {
  return {
    type: import_reducer.SET_SEND_ERROR,
    payload: value
  };
};
var send = async (settings, store, api) => {
  var _a;
  const { mapServerFields, afterSendDelay, debug = false } = settings;
  const state = store.getState();
  const d = store.dispatch;
  d(setIsSending(true));
  d(setTouched(Object.keys(state.fields), true));
  const [isFormInvalid, formErrors] = (0, import_helpers.isFormHasErrors)(settings, store, false);
  if (debug)
    console.log(
      `[useForm][send][Is form valid: ${isFormInvalid ? "no" : "yes"}]`,
      formErrors
    );
  if (isFormInvalid) {
    d(setErrors(formErrors));
    d(setIsCanceling(true));
    setTimeout(() => {
      d(setIsCanceling(false));
    }, afterSendDelay);
    d(setIsSending(false));
    throw new import_errors.FormValidateError("Form is invalid");
  }
  try {
    d(setSendError(null));
    if (debug)
      console.log(`[useForm][send][Sending]`, state.values);
    const resp = await api(state.values);
    if (debug)
      console.log(`[useForm][send][Success]`);
    d(setIsSuccess(true));
    setTimeout(() => {
      d(setIsSuccess(false));
    }, afterSendDelay);
    d(setIsSending(false));
    return { response: resp, values: state.values };
  } catch (error) {
    const _errors = {};
    let hasErrors = false;
    if ((_a = error == null ? void 0 : error.__meta__) == null ? void 0 : _a.formInfo) {
      const { formInfo } = error.__meta__;
      if (formInfo.fieldsErrors) {
        Object.keys(formInfo.fieldsErrors).forEach((fieldName) => {
          var _a2;
          const realFieldName = (_a2 = mapServerFields[fieldName]) != null ? _a2 : fieldName;
          hasErrors = true;
          _errors[realFieldName] = formInfo.fieldsErrors[fieldName];
        });
      }
    }
    if (debug) {
      console.error(`[useForm][send][Fail]`, error == null ? void 0 : error.message);
      console.error(error);
    }
    d(setSendError(error));
    d(setIsCanceling(true));
    setTimeout(() => {
      d(setIsCanceling(false));
    }, afterSendDelay);
    d(setIsSending(false));
    if (hasErrors) {
      d(setErrors(_errors));
    }
    throw new import_errors.FormSendError("Request has failed", error, _errors);
  }
};
var createSend = (settings) => (store) => (next) => async (action) => {
  const result = next(action);
  if (action.type !== import_reducer.SEND_FORM) {
    return result;
  }
  const { api, onResolve = noop, onReject = noop } = action.payload;
  try {
    const resp = await send(settings, store, api);
    onResolve(resp);
  } catch (e) {
    onReject(e);
  }
};
var send_default = createSend;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
