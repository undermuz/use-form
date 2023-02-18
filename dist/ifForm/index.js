// src/ifForm/index.tsx
import {
  useIsFormCanceling,
  useIsFormHasErrors,
  useIsFormSending,
  useIsFormSuccess
} from "../utils/index.js";
import { Fragment, jsx } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsx(Fragment, { children });
};
var ifForm_default = IfForm;
export {
  ifForm_default as default
};
