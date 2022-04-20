"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFormSubmitStatus = void 0;
var tslib_1 = require("tslib");
var jsx_runtime_1 = require("react/jsx-runtime");
var ifForm_1 = tslib_1.__importDefault(require("../ifForm"));
var utils_1 = require("../utils");
var EnumFormSubmitStatus;
(function (EnumFormSubmitStatus) {
    EnumFormSubmitStatus["Default"] = "default";
    EnumFormSubmitStatus["Succeed"] = "succeed";
    EnumFormSubmitStatus["Canceling"] = "canceling";
    EnumFormSubmitStatus["Sending"] = "sending";
})(EnumFormSubmitStatus = exports.EnumFormSubmitStatus || (exports.EnumFormSubmitStatus = {}));
var FormSubmit = function (props) {
    var _a = props.as, Component = _a === void 0 ? "button" : _a, children = props.children, _b = props.disableWhenErrors, disableWhenErrors = _b === void 0 ? false : _b, onSend = props.onSend, onSucceed = props.onSucceed, onError = props.onError, _c = props.disabled, disabled = _c === void 0 ? false : _c, otherProps = tslib_1.__rest(props, ["as", "children", "disableWhenErrors", "onSend", "onSucceed", "onError", "disabled"]);
    var hasErrors = (0, utils_1.useIsFormHasErrors)();
    var isSending = (0, utils_1.useIsFormSending)();
    var submit = (0, utils_1.useFormSubmit)(onSend, onSucceed, onError);
    return ((0, jsx_runtime_1.jsxs)(Component, tslib_1.__assign({}, otherProps, { disabled: isSending || (hasErrors && disableWhenErrors) || disabled, type: "submit", onClick: submit }, { children: [(0, jsx_runtime_1.jsx)(ifForm_1.default, { children: children ? children(EnumFormSubmitStatus.Default) : "Send" }), (0, jsx_runtime_1.jsx)(ifForm_1.default, tslib_1.__assign({ isSuccess: true }, { children: children ? children(EnumFormSubmitStatus.Succeed) : "Succeed" })), (0, jsx_runtime_1.jsx)(ifForm_1.default, tslib_1.__assign({ isCanceling: true }, { children: children ? children(EnumFormSubmitStatus.Canceling) : "Failed" })), (0, jsx_runtime_1.jsx)(ifForm_1.default, tslib_1.__assign({ isSending: true }, { children: children
                    ? children(EnumFormSubmitStatus.Sending)
                    : "Sending..." }))] })));
};
exports.default = FormSubmit;
