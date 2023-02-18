// src/formSubmit/index.tsx
import IfForm from "../ifForm/index.js";
import {
  useFormSubmit,
  useIsFormHasErrors,
  useIsFormSending
} from "../utils/index.js";
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs(
    Component,
    {
      ...otherProps,
      disabled: isSending || hasErrors && disableWhenErrors || disabled,
      type: "submit",
      onClick: submit,
      children: [
        /* @__PURE__ */ jsx(IfForm, { children: children ? children("default" /* Default */) : "Send" }),
        /* @__PURE__ */ jsx(IfForm, { isSuccess: true, children: children ? children("succeed" /* Succeed */) : "Succeed" }),
        /* @__PURE__ */ jsx(IfForm, { isCanceling: true, children: children ? children("canceling" /* Canceling */) : "Failed" }),
        /* @__PURE__ */ jsx(IfForm, { isSending: true, children: children ? children("sending" /* Sending */) : "Sending..." })
      ]
    }
  );
};
var formSubmit_default = FormSubmit;
export {
  EnumFormSubmitStatus,
  formSubmit_default as default
};
