"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  ConnectToForm: () => import_connectToForm.default,
  DispatchFunction: () => import_useReducer.DispatchFunction,
  EnumFormStatus: () => import_reducer.EnumFormStatus,
  EnumFormSubmitStatus: () => import_formSubmit.EnumFormSubmitStatus,
  FormContext: () => import_formContext.default,
  FormSubmit: () => import_formSubmit.default,
  IAction: () => import_useReducer.IAction,
  IActionPayload: () => import_useReducer.IActionPayload,
  IFields: () => import_reducer.IFields,
  IFormState: () => import_reducer.IFormState,
  IIfFormProps: () => import_ifForm.IIfFormProps,
  IInitialStateOptions: () => import_useForm2.IInitialStateOptions,
  IStore: () => import_useReducer.IStore,
  ITouched: () => import_reducer.ITouched,
  IUseForm: () => import_useForm2.IUseForm,
  IUseFormOptions: () => import_useForm2.IUseFormOptions,
  IValueTest: () => import_reducer.IValueTest,
  IValues: () => import_reducer.IValues,
  IfForm: () => import_ifForm.default,
  SendFunction: () => import_useForm2.SendFunction,
  UseFormConfig: () => import_useForm2.UseFormConfig,
  default: () => src_default,
  useFormContext: () => import_formContext.useFormContext,
  useFormErrors: () => import_utils.useFormErrors,
  useFormFields: () => import_utils.useFormFields,
  useFormSubmit: () => import_utils.useFormSubmit,
  useIsFormCanceling: () => import_utils.useIsFormCanceling,
  useIsFormHasErrors: () => import_utils.useIsFormHasErrors,
  useIsFormSending: () => import_utils.useIsFormSending,
  useIsFormSuccess: () => import_utils.useIsFormSuccess,
  useReducer: () => import_useReducer.default
});
module.exports = __toCommonJS(src_exports);
var import_useForm = __toESM(require("./useForm/index.cjs"), 1);
var import_useForm2 = require("./useForm/index.cjs");
var import_useReducer = __toESM(require("./useReducer/index.cjs"), 1);
var import_reducer = require("./useForm/reducer.cjs");
var import_formContext = __toESM(require("./connectToForm/formContext.cjs"), 1);
var import_connectToForm = __toESM(require("./connectToForm/index.cjs"), 1);
var import_utils = require("./utils/index.cjs");
var import_ifForm = __toESM(require("./ifForm/index.cjs"), 1);
var import_formSubmit = __toESM(require("./formSubmit/index.cjs"), 1);
var src_default = import_useForm.default;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConnectToForm,
  DispatchFunction,
  EnumFormStatus,
  EnumFormSubmitStatus,
  FormContext,
  FormSubmit,
  IAction,
  IActionPayload,
  IFields,
  IFormState,
  IIfFormProps,
  IInitialStateOptions,
  IStore,
  ITouched,
  IUseForm,
  IUseFormOptions,
  IValueTest,
  IValues,
  IfForm,
  SendFunction,
  UseFormConfig,
  useFormContext,
  useFormErrors,
  useFormFields,
  useFormSubmit,
  useIsFormCanceling,
  useIsFormHasErrors,
  useIsFormSending,
  useIsFormSuccess,
  useReducer
});
