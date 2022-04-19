"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormSubmit = exports.useFormErrors = exports.useIsFormHasErrors = exports.useIsFormSending = exports.useIsFormCanceling = exports.useIsFormSuccess = void 0;
const react_1 = require("react");
const formContext_1 = require("../connectToForm/formContext");
const useIsFormSuccess = () => {
    const params = (0, formContext_1.useFormContext)();
    return params.isSuccess;
};
exports.useIsFormSuccess = useIsFormSuccess;
const useIsFormCanceling = () => {
    const params = (0, formContext_1.useFormContext)();
    return params.isCanceling;
};
exports.useIsFormCanceling = useIsFormCanceling;
const useIsFormSending = () => {
    const params = (0, formContext_1.useFormContext)();
    return params.isSending;
};
exports.useIsFormSending = useIsFormSending;
const useIsFormHasErrors = () => {
    const params = (0, formContext_1.useFormContext)();
    return Object.keys(params.errors).length > 0;
};
exports.useIsFormHasErrors = useIsFormHasErrors;
const useFormErrors = () => {
    const params = (0, formContext_1.useFormContext)();
    return params.errors;
};
exports.useFormErrors = useFormErrors;
const useFormSubmit = (onSend, onFinally, onError) => {
    const { send } = (0, formContext_1.useFormContext)();
    const handleSave = (0, react_1.useCallback)(() => {
        send(onSend).then(onFinally, onError);
    }, [send, onSend, onFinally, onError]);
    return handleSave;
};
exports.useFormSubmit = useFormSubmit;
