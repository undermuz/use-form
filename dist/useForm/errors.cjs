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

// src/useForm/errors.ts
var errors_exports = {};
__export(errors_exports, {
  FormSendError: () => FormSendError,
  FormValidateError: () => FormValidateError
});
module.exports = __toCommonJS(errors_exports);
var FormValidateError = class extends Error {
  constructor(message, errors) {
    super(message);
    this.name = "FormValidateError";
    this.errors = errors;
    this.message = message;
    Object.setPrototypeOf(this, FormValidateError.prototype);
  }
};
var FormSendError = class extends Error {
  constructor(message, catchError, errors) {
    super(message);
    this.name = "FormSendError";
    this.catchError = catchError;
    this.errors = errors;
    this.message = message;
    Object.setPrototypeOf(this, FormSendError.prototype);
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FormSendError,
  FormValidateError
});
