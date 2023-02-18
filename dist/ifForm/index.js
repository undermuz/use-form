// src/ifForm/index.tsx
import React from "react";
import {
  useIsFormCanceling,
  useIsFormHasErrors,
  useIsFormSending,
  useIsFormSuccess
} from "../utils.js";
var IfForm = (props) => {
  const {
    children,
    isCanceling = false,
    isSending = false,
    isSuccess = false,
    hasErrors
  } = props;
  const isFormHasErrors = useIsFormHasErrors();
  const isFormSuccess = useIsFormSuccess();
  const isFormCanceling = useIsFormCanceling();
  const isFormSending = useIsFormSending();
  if (hasErrors && !isFormHasErrors || isSuccess && !isFormSuccess || isCanceling && !isFormCanceling || isSending && !isFormSending) {
    return null;
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, children);
};
var ifForm_default = IfForm;
export {
  ifForm_default as default
};
