// src/formSubmit/index.tsx
import React from "react";
import IfForm from "../ifForm.js";
import {
  useFormSubmit,
  useIsFormHasErrors,
  useIsFormSending
} from "../utils.js";
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
  const hasErrors = useIsFormHasErrors();
  const isSending = useIsFormSending();
  const submit = useFormSubmit(onSend, onSucceed, onError);
  return /* @__PURE__ */ React.createElement(
    Component,
    {
      ...otherProps,
      disabled: isSending || hasErrors && disableWhenErrors || disabled,
      type: "submit",
      onClick: submit
    },
    /* @__PURE__ */ React.createElement(IfForm, null, children ? children("default" /* Default */) : "Send"),
    /* @__PURE__ */ React.createElement(IfForm, { isSuccess: true }, children ? children("succeed" /* Succeed */) : "Succeed"),
    /* @__PURE__ */ React.createElement(IfForm, { isCanceling: true }, children ? children("canceling" /* Canceling */) : "Failed"),
    /* @__PURE__ */ React.createElement(IfForm, { isSending: true }, children ? children("sending" /* Sending */) : "Sending...")
  );
};
var formSubmit_default = FormSubmit;
export {
  EnumFormSubmitStatus,
  formSubmit_default as default
};
