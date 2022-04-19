"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const utils_1 = require("../utils");
const IfForm = (props) => {
    const { children, isCanceling = false, isSending = false, isSuccess = false, hasErrors, } = props;
    const isFormHasErrors = (0, utils_1.useIsFormHasErrors)();
    const isFormSuccess = (0, utils_1.useIsFormSuccess)();
    const isFormCanceling = (0, utils_1.useIsFormCanceling)();
    const isFormSending = (0, utils_1.useIsFormSending)();
    if ((hasErrors && !isFormHasErrors) ||
        (isSuccess && !isFormSuccess) ||
        (isCanceling && !isFormCanceling) ||
        (isSending && !isFormSending)) {
        return null;
    }
    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: children });
};
exports.default = IfForm;
