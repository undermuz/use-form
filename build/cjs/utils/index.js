"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useRefBy = exports.useFormSubmit = exports.useFormErrors = exports.useFormFields = exports.useIsFormHasErrors = exports.useIsFormSending = exports.useIsFormCanceling = exports.useIsFormSuccess = void 0;
var react_1 = require("react");
var formContext_1 = require("../connectToForm/formContext");
var useIsFormSuccess = function () {
    var params = (0, formContext_1.useFormContext)();
    return params.isSuccess;
};
exports.useIsFormSuccess = useIsFormSuccess;
var useIsFormCanceling = function () {
    var params = (0, formContext_1.useFormContext)();
    return params.isCanceling;
};
exports.useIsFormCanceling = useIsFormCanceling;
var useIsFormSending = function () {
    var params = (0, formContext_1.useFormContext)();
    return params.isSending;
};
exports.useIsFormSending = useIsFormSending;
var useIsFormHasErrors = function () {
    var params = (0, formContext_1.useFormContext)();
    return Object.keys(params.errors).length > 0;
};
exports.useIsFormHasErrors = useIsFormHasErrors;
var useFormFields = function () {
    var params = (0, formContext_1.useFormContext)();
    return params.fields;
};
exports.useFormFields = useFormFields;
var useFormErrors = function () {
    var params = (0, formContext_1.useFormContext)();
    return params.errors;
};
exports.useFormErrors = useFormErrors;
var useFormSubmit = function (onSend, onSucceed, onError) {
    var send = (0, formContext_1.useFormContext)().send;
    var handleSave = (0, react_1.useCallback)(function () {
        send(onSend).then(onSucceed, onError);
    }, [send, onSend, onSucceed, onError]);
    return handleSave;
};
exports.useFormSubmit = useFormSubmit;
var useRefBy = function (by) {
    var refBy = (0, react_1.useRef)(by);
    (0, react_1.useEffect)(function () {
        refBy.current = by;
    }, [by]);
    return refBy;
};
exports.useRefBy = useRefBy;
