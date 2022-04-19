import { useCallback } from "react";
import { useFormContext } from "../connectToForm/formContext";
export const useIsFormSuccess = () => {
    const params = useFormContext();
    return params.isSuccess;
};
export const useIsFormCanceling = () => {
    const params = useFormContext();
    return params.isCanceling;
};
export const useIsFormSending = () => {
    const params = useFormContext();
    return params.isSending;
};
export const useIsFormHasErrors = () => {
    const params = useFormContext();
    return Object.keys(params.errors).length > 0;
};
export const useFormErrors = () => {
    const params = useFormContext();
    return params.errors;
};
export const useFormSubmit = (onSend, onFinally, onError) => {
    const { send } = useFormContext();
    const handleSave = useCallback(() => {
        send(onSend).then(onFinally, onError);
    }, [send, onSend, onFinally, onError]);
    return handleSave;
};
