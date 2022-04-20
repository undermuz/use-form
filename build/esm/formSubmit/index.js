import { __assign, __rest } from "tslib";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsxs(Component, __assign({}, otherProps, { disabled: isSending || (hasErrors && disableWhenErrors) || disabled, type: "submit", onClick: submit }, { children: [_jsx(IfForm, { children: children ? children(EnumFormSubmitStatus.Default) : "Send" }), _jsx(IfForm, __assign({ isSuccess: true }, { children: children ? children(EnumFormSubmitStatus.Succeed) : "Succeed" })), _jsx(IfForm, __assign({ isCanceling: true }, { children: children ? children(EnumFormSubmitStatus.Canceling) : "Failed" })), _jsx(IfForm, __assign({ isSending: true }, { children: children
                    ? children(EnumFormSubmitStatus.Sending)
                    : "Sending..." }))] })));
};
export default FormSubmit;
