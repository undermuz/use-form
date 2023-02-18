// src/useForm/middlewares/send.ts
import { FormSendError, FormValidateError } from "../errors.js";
import { isFormHasErrors } from "../helpers.js";
import {
  SET_ERRORS,
  SET_IS_SENDING,
  SET_IS_CANCELING,
  SET_IS_SUCCESS,
  SET_SEND_ERROR,
  SEND_FORM,
  SET_TOUCHED
} from "../reducer.js";
var noop = () => {
};
var setIsSending = (value) => {
  return {
    type: SET_IS_SENDING,
    payload: value
  };
};
var setIsCanceling = (value) => {
  return {
    type: SET_IS_CANCELING,
    payload: value
  };
};
var setIsSuccess = (value) => {
  return {
    type: SET_IS_SUCCESS,
    payload: value
  };
};
var setErrors = (value) => {
  return {
    type: SET_ERRORS,
    payload: { errors: value }
  };
};
var setTouched = (value, silent = false) => {
  return {
    type: SET_TOUCHED,
    payload: { touched: value },
    silent
  };
};
var setSendError = (value) => {
  return {
    type: SET_SEND_ERROR,
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
  const [isFormInvalid, formErrors] = isFormHasErrors(settings, store, false);
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
    throw new FormValidateError("Form is invalid");
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
          let realFieldName = (_a2 = mapServerFields[fieldName]) != null ? _a2 : fieldName;
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
    throw new FormSendError("Request has failed", error, _errors);
  }
};
var createSend = (settings) => (store) => (next) => async (action) => {
  const result = next(action);
  if (action.type !== SEND_FORM) {
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
export {
  send_default as default
};
