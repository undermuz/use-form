import { useCallback } from "react";
import { useFormContext } from "../connectToForm/formContext";
export var useIsFormSuccess = function () {
    var params = useFormContext();
    return params.isSuccess;
};
export var useIsFormCanceling = function () {
    var params = useFormContext();
    return params.isCanceling;
};
export var useIsFormSending = function () {
    var params = useFormContext();
    return params.isSending;
};
export var useIsFormHasErrors = function () {
    var params = useFormContext();
    return Object.keys(params.errors).length > 0;
};
export var useFormFields = function () {
    var params = useFormContext();
    return params.fields;
};
export var useFormErrors = function () {
    var params = useFormContext();
    return params.errors;
};
export var useFormSubmit = function (onSend, onSucceed, onError) {
    var send = useFormContext().send;
    var handleSave = useCallback(function () {
        send(onSend).then(onSucceed, onError);
    }, [send, onSend, onSucceed, onError]);
    return handleSave;
};
