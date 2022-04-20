import { __assign, __rest } from "tslib";
import React from "react";
import IfForm from "../ifForm";
import { useFormSubmit, useIsFormHasErrors, useIsFormSending, } from "../utils";
export var EnumFormSubmitStatus;
(function (EnumFormSubmitStatus) {
    EnumFormSubmitStatus["Default"] = "default";
    EnumFormSubmitStatus["Succeed"] = "succeed";
    EnumFormSubmitStatus["Canceling"] = "canceling";
    EnumFormSubmitStatus["Sending"] = "sending";
})(EnumFormSubmitStatus || (EnumFormSubmitStatus = {}));
var FormSubmit = function (props) {
    var _a = props.as, Component = _a === void 0 ? "button" : _a, children = props.children, _b = props.disableWhenErrors, disableWhenErrors = _b === void 0 ? false : _b, onSend = props.onSend, onSucceed = props.onSucceed, onError = props.onError, _c = props.disabled, disabled = _c === void 0 ? false : _c, otherProps = __rest(props, ["as", "children", "disableWhenErrors", "onSend", "onSucceed", "onError", "disabled"]);
    var hasErrors = useIsFormHasErrors();
    var isSending = useIsFormSending();
    var submit = useFormSubmit(onSend, onSucceed, onError);
    return (React.createElement(Component, __assign({}, otherProps, { disabled: isSending || (hasErrors && disableWhenErrors) || disabled, type: "submit", onClick: submit }),
        React.createElement(IfForm, null, children ? children(EnumFormSubmitStatus.Default) : "Send"),
        React.createElement(IfForm, { isSuccess: true }, children ? children(EnumFormSubmitStatus.Succeed) : "Succeed"),
        React.createElement(IfForm, { isCanceling: true }, children ? children(EnumFormSubmitStatus.Canceling) : "Failed"),
        React.createElement(IfForm, { isSending: true }, children
            ? children(EnumFormSubmitStatus.Sending)
            : "Sending...")));
};
export default FormSubmit;
