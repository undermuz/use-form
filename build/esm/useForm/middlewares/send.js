const noop = () => { };
import { FormSendError, FormValidateError } from "../errors";
import { isFormHasErrors } from "../helpers";
import { SET_ERRORS, SET_IS_SENDING, SET_IS_CANCELING, SET_IS_SUCCESS, SET_SEND_ERROR, SEND_FORM, SET_TOUCHED, } from "../reducer";
const setIsSending = (value) => {
    return {
        type: SET_IS_SENDING,
        payload: value,
    };
};
const setIsCanceling = (value) => {
    return {
        type: SET_IS_CANCELING,
        payload: value,
    };
};
const setIsSuccess = (value) => {
    return {
        type: SET_IS_SUCCESS,
        payload: value,
    };
};
const setErrors = (value) => {
    return {
        type: SET_ERRORS,
        payload: { errors: value },
    };
};
const setTouched = (value, silent = false) => {
    return {
        type: SET_TOUCHED,
        payload: { touched: value },
        silent,
    };
};
const setSendError = (value) => {
    return {
        type: SET_SEND_ERROR,
        payload: value,
    };
};
const send = async (settings, store, api) => {
    var _a;
    const { mapServerFields, afterSendDelay, debug = false } = settings;
    const state = store.getState();
    const d = store.dispatch;
    d(setIsSending(true));
    d(setTouched(Object.keys(state.fields), true));
    const [isFormInvalid, formErrors] = isFormHasErrors(settings, store, false);
    if (debug)
        console.log(`[useForm][send][Is form valid: ${isFormInvalid ? "no" : "yes"}]`, formErrors);
    if (isFormInvalid) {
        d(setErrors(formErrors));
        d(setIsCanceling(true));
        setTimeout(() => {
            d(setIsCanceling(false));
        }, afterSendDelay);
        d(setIsSending(false));
        throw new FormValidateError("Form is invalid");
    }
    try {
        d(setSendError(null));
        if (debug)
            console.log(`[useForm][send][Sending]`, state.values);
        const resp = await api(state.values);
        if (debug)
            console.log(`[useForm][send][Success]`);
        d(setIsSuccess(true));
        setTimeout(() => {
            d(setIsSuccess(false));
        }, afterSendDelay);
        d(setIsSending(false));
        return { response: resp, values: state.values };
    }
    catch (error) {
        const _errors = {};
        let hasErrors = false;
        //@ts-ignore
        if ((_a = error === null || error === void 0 ? void 0 : error.__meta__) === null || _a === void 0 ? void 0 : _a.formInfo) {
            //@ts-ignore
            const { formInfo } = error.__meta__;
            //@ts-ignore
            if (formInfo.fieldsErrors) {
                Object.keys(formInfo.fieldsErrors).forEach((fieldName) => {
                    var _a;
                    let realFieldName = (_a = mapServerFields[fieldName]) !== null && _a !== void 0 ? _a : fieldName;
                    hasErrors = true;
                    _errors[realFieldName] = formInfo.fieldsErrors[fieldName];
                });
            }
        }
        if (debug) {
            //@ts-ignore
            console.error(`[useForm][send][Fail]`, error === null || error === void 0 ? void 0 : error.message);
            console.error(error);
        }
        d(setSendError(error));
        d(setIsCanceling(true));
        setTimeout(() => {
            d(setIsCanceling(false));
        }, afterSendDelay);
        d(setIsSending(false));
        if (hasErrors) {
            d(setErrors(_errors));
        }
        throw new FormSendError("Request has failed", error, _errors);
    }
};
const createSend = (settings) => (store) => (next) => async (action) => {
    const result = next(action);
    if (action.type !== SEND_FORM) {
        return result;
    }
    const { api, onResolve = noop, onReject = noop } = action.payload;
    try {
        const resp = await send(settings, store, api);
        onResolve(resp);
        return resp;
    }
    catch (e) {
        onReject(e);
        throw e;
    }
};
export default createSend;
