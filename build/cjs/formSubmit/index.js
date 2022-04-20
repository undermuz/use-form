"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumFormSubmitStatus = void 0;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importDefault(require("react"));
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
    return (react_1.default.createElement(Component, tslib_1.__assign({}, otherProps, { disabled: isSending || (hasErrors && disableWhenErrors) || disabled, type: "submit", onClick: submit }),
        react_1.default.createElement(ifForm_1.default, null, children ? children(EnumFormSubmitStatus.Default) : "Send"),
        react_1.default.createElement(ifForm_1.default, { isSuccess: true }, children ? children(EnumFormSubmitStatus.Succeed) : "Succeed"),
        react_1.default.createElement(ifForm_1.default, { isCanceling: true }, children ? children(EnumFormSubmitStatus.Canceling) : "Failed"),
        react_1.default.createElement(ifForm_1.default, { isSending: true }, children
            ? children(EnumFormSubmitStatus.Sending)
            : "Sending...")));
};
exports.default = FormSubmit;
