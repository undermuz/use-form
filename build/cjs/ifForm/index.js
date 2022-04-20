"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var utils_1 = require("../utils");
var IfForm = function (props) {
    var children = props.children, _a = props.isCanceling, isCanceling = _a === void 0 ? false : _a, _b = props.isSending, isSending = _b === void 0 ? false : _b, _c = props.isSuccess, isSuccess = _c === void 0 ? false : _c, hasErrors = props.hasErrors;
    var isFormHasErrors = (0, utils_1.useIsFormHasErrors)();
    var isFormSuccess = (0, utils_1.useIsFormSuccess)();
    var isFormCanceling = (0, utils_1.useIsFormCanceling)();
    var isFormSending = (0, utils_1.useIsFormSending)();
    if ((hasErrors && !isFormHasErrors) ||
        (isSuccess && !isFormSuccess) ||
        (isCanceling && !isFormCanceling) ||
        (isSending && !isFormSending)) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.default = IfForm;
