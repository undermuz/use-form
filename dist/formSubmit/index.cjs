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

// src/formSubmit/index.tsx
var formSubmit_exports = {};
__export(formSubmit_exports, {
  EnumFormSubmitStatus: () => EnumFormSubmitStatus,
  default: () => formSubmit_default
});
module.exports = __toCommonJS(formSubmit_exports);
var import_react = __toESM(require("react"), 1);
var import_ifForm = __toESM(require("../ifForm/index.cjs"), 1);
var import_utils = require("../utils/index.cjs");
var EnumFormSubmitStatus = /* @__PURE__ */ ((EnumFormSubmitStatus2) => {
  EnumFormSubmitStatus2["Default"] = "default";
  EnumFormSubmitStatus2["Succeed"] = "succeed";
  EnumFormSubmitStatus2["Canceling"] = "canceling";
  EnumFormSubmitStatus2["Sending"] = "sending";
  return EnumFormSubmitStatus2;
})(EnumFormSubmitStatus || {});
var FormSubmit = (props) => {
  const {
    as: Component = "button",
    children,
    disableWhenErrors = false,
    onSend,
    onSucceed,
    onError,
    disabled = false,
    ...otherProps
  } = props;
  const hasErrors = (0, import_utils.useIsFormHasErrors)();
  const isSending = (0, import_utils.useIsFormSending)();
  const submit = (0, import_utils.useFormSubmit)(onSend, onSucceed, onError);
  return /* @__PURE__ */ import_react.default.createElement(
    Component,
    {
      ...otherProps,
      disabled: isSending || hasErrors && disableWhenErrors || disabled,
      type: "submit",
      onClick: submit
    },
    /* @__PURE__ */ import_react.default.createElement(import_ifForm.default, null, children ? children("default" /* Default */) : "Send"),
    /* @__PURE__ */ import_react.default.createElement(import_ifForm.default, { isSuccess: true }, children ? children("succeed" /* Succeed */) : "Succeed"),
    /* @__PURE__ */ import_react.default.createElement(import_ifForm.default, { isCanceling: true }, children ? children("canceling" /* Canceling */) : "Failed"),
    /* @__PURE__ */ import_react.default.createElement(import_ifForm.default, { isSending: true }, children ? children("sending" /* Sending */) : "Sending...")
  );
};
var formSubmit_default = FormSubmit;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EnumFormSubmitStatus
});
