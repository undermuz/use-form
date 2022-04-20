"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFormSubmitStatus = void 0;
const tslib_1 = require("tslib");
const jsx_runtime_1 = require("react/jsx-runtime");
const ifForm_1 = tslib_1.__importDefault(require("../ifForm"));
const utils_1 = require("../utils");
var EnumFormSubmitStatus;
(function (EnumFormSubmitStatus) {
    EnumFormSubmitStatus["Default"] = "default";
    EnumFormSubmitStatus["Succeed"] = "succeed";
    EnumFormSubmitStatus["Canceling"] = "canceling";
    EnumFormSubmitStatus["Sending"] = "sending";
})(EnumFormSubmitStatus = exports.EnumFormSubmitStatus || (exports.EnumFormSubmitStatus = {}));
const FormSubmit = (props) => {
    const { as: Component = "button", children, disableWhenErrors = false, onSend, onSucceed, onError, disabled = false, ...otherProps } = props;
    const hasErrors = (0, utils_1.useIsFormHasErrors)();
    const isSending = (0, utils_1.useIsFormSending)();
    const submit = (0, utils_1.useFormSubmit)(onSend, onSucceed, onError);
    return ((0, jsx_runtime_1.jsxs)(Component, { ...otherProps, disabled: isSending || (hasErrors && disableWhenErrors) || disabled, type: "submit", onClick: submit, children: [(0, jsx_runtime_1.jsx)(ifForm_1.default, { children: children ? children(EnumFormSubmitStatus.Default) : "Send" }), (0, jsx_runtime_1.jsx)(ifForm_1.default, { isSuccess: true, children: children ? children(EnumFormSubmitStatus.Succeed) : "Succeed" }), (0, jsx_runtime_1.jsx)(ifForm_1.default, { isCanceling: true, children: children ? children(EnumFormSubmitStatus.Canceling) : "Failed" }), (0, jsx_runtime_1.jsx)(ifForm_1.default, { isSending: true, children: children
                    ? children(EnumFormSubmitStatus.Sending)
                    : "Sending..." })] }));
};
exports.default = FormSubmit;
