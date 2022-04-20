import React from "react";
import { useIsFormCanceling, useIsFormHasErrors, useIsFormSending, useIsFormSuccess, } from "../utils";
var IfForm = function (props) {
    var children = props.children, _a = props.isCanceling, isCanceling = _a === void 0 ? false : _a, _b = props.isSending, isSending = _b === void 0 ? false : _b, _c = props.isSuccess, isSuccess = _c === void 0 ? false : _c, hasErrors = props.hasErrors;
    var isFormHasErrors = useIsFormHasErrors();
    var isFormSuccess = useIsFormSuccess();
    var isFormCanceling = useIsFormCanceling();
    var isFormSending = useIsFormSending();
    if ((hasErrors && !isFormHasErrors) ||
        (isSuccess && !isFormSuccess) ||
        (isCanceling && !isFormCanceling) ||
        (isSending && !isFormSending)) {
        return null;
    }
    return React.createElement(React.Fragment, null, children);
};
export default IfForm;
