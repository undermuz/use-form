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

// src/utils/index.ts
var utils_exports = {};
__export(utils_exports, {
  useFormErrors: () => useFormErrors,
  useFormFields: () => useFormFields,
  useFormSubmit: () => useFormSubmit,
  useIsFormCanceling: () => useIsFormCanceling,
  useIsFormHasErrors: () => useIsFormHasErrors,
  useIsFormSending: () => useIsFormSending,
  useIsFormSuccess: () => useIsFormSuccess,
  useRefBy: () => useRefBy
});
module.exports = __toCommonJS(utils_exports);
var import_react = require("react");
var import_formContext = require("../connectToForm/formContext.cjs");
var useIsFormSuccess = () => {
  const params = (0, import_formContext.useFormContext)();
  return params.isSuccess;
};
var useIsFormCanceling = () => {
  const params = (0, import_formContext.useFormContext)();
  return params.isCanceling;
};
var useIsFormSending = () => {
  const params = (0, import_formContext.useFormContext)();
  return params.isSending;
};
var useIsFormHasErrors = () => {
  const params = (0, import_formContext.useFormContext)();
  return Object.keys(params.errors).length > 0;
};
var useFormFields = () => {
  const params = (0, import_formContext.useFormContext)();
  return params.fields;
};
var useFormErrors = () => {
  const params = (0, import_formContext.useFormContext)();
  return params.errors;
};
var useFormSubmit = (onSend, onSucceed, onError) => {
  const { send } = (0, import_formContext.useFormContext)();
  const handleSave = (0, import_react.useCallback)(() => {
    send(onSend).then(onSucceed, onError);
  }, [send, onSend, onSucceed, onError]);
  return handleSave;
};
var useRefBy = (by) => {
  const refBy = (0, import_react.useRef)(by);
  (0, import_react.useEffect)(() => {
    refBy.current = by;
  }, [by]);
  return refBy;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFormErrors,
  useFormFields,
  useFormSubmit,
  useIsFormCanceling,
  useIsFormHasErrors,
  useIsFormSending,
  useIsFormSuccess,
  useRefBy
});
