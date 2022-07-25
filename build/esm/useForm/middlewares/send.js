import { __awaiter, __generator } from "tslib";
var noop = function () { };
import { FormSendError, FormValidateError } from "../errors";
import { isFormHasErrors } from "../helpers";
import { SET_ERRORS, SET_IS_SENDING, SET_IS_CANCELING, SET_IS_SUCCESS, SET_SEND_ERROR, SEND_FORM, SET_TOUCHED, } from "../reducer";
var setIsSending = function (value) {
    return {
        type: SET_IS_SENDING,
        payload: value,
    };
};
var setIsCanceling = function (value) {
    return {
        type: SET_IS_CANCELING,
        payload: value,
    };
};
var setIsSuccess = function (value) {
    return {
        type: SET_IS_SUCCESS,
        payload: value,
    };
};
var setErrors = function (value) {
    return {
        type: SET_ERRORS,
        payload: { errors: value },
    };
};
var setTouched = function (value, silent) {
    if (silent === void 0) { silent = false; }
    return {
        type: SET_TOUCHED,
        payload: { touched: value },
        silent: silent,
    };
};
var setSendError = function (value) {
    return {
        type: SET_SEND_ERROR,
        payload: value,
    };
};
var send = function (settings, store, api) { return __awaiter(void 0, void 0, void 0, function () {
    var mapServerFields, afterSendDelay, _a, debug, state, d, _b, isFormInvalid, formErrors, resp, error_1, _errors_1, hasErrors_1, formInfo_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                mapServerFields = settings.mapServerFields, afterSendDelay = settings.afterSendDelay, _a = settings.debug, debug = _a === void 0 ? false : _a;
                state = store.getState();
                d = store.dispatch;
                d(setIsSending(true));
                d(setTouched(Object.keys(state.fields), true));
                _b = isFormHasErrors(settings, store, false), isFormInvalid = _b[0], formErrors = _b[1];
                if (debug)
                    console.log("[useForm][send][Is form valid: ".concat(isFormInvalid ? "no" : "yes", "]"), formErrors);
                if (isFormInvalid) {
                    d(setErrors(formErrors));
                    d(setIsCanceling(true));
                    setTimeout(function () {
                        d(setIsCanceling(false));
                    }, afterSendDelay);
                    d(setIsSending(false));
                    throw new FormValidateError("Form is invalid");
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                d(setSendError(null));
                if (debug)
                    console.log("[useForm][send][Sending]", state.values);
                return [4 /*yield*/, api(state.values)];
            case 2:
                resp = _d.sent();
                if (debug)
                    console.log("[useForm][send][Success]");
                d(setIsSuccess(true));
                setTimeout(function () {
                    d(setIsSuccess(false));
                }, afterSendDelay);
                d(setIsSending(false));
                return [2 /*return*/, { response: resp, values: state.values }];
            case 3:
                error_1 = _d.sent();
                _errors_1 = {};
                hasErrors_1 = false;
                //@ts-ignore
                if ((_c = error_1 === null || error_1 === void 0 ? void 0 : error_1.__meta__) === null || _c === void 0 ? void 0 : _c.formInfo) {
                    formInfo_1 = error_1.__meta__.formInfo;
                    //@ts-ignore
                    if (formInfo_1.fieldsErrors) {
                        Object.keys(formInfo_1.fieldsErrors).forEach(function (fieldName) {
                            var _a;
                            var realFieldName = (_a = mapServerFields[fieldName]) !== null && _a !== void 0 ? _a : fieldName;
                            hasErrors_1 = true;
                            _errors_1[realFieldName] = formInfo_1.fieldsErrors[fieldName];
                        });
                    }
                }
                if (debug) {
                    //@ts-ignore
                    console.error("[useForm][send][Fail]", error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                    console.error(error_1);
                }
                d(setSendError(error_1));
                d(setIsCanceling(true));
                setTimeout(function () {
                    d(setIsCanceling(false));
                }, afterSendDelay);
                d(setIsSending(false));
                if (hasErrors_1) {
                    d(setErrors(_errors_1));
                }
                throw new FormSendError("Request has failed", error_1, _errors_1);
            case 4: return [2 /*return*/];
        }
    });
}); };
var createSend = function (settings) {
    return function (store) {
        return function (next) {
            return function (action) { return __awaiter(void 0, void 0, void 0, function () {
                var result, _a, api, _b, onResolve, _c, onReject, resp, e_1;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            result = next(action);
                            if (action.type !== SEND_FORM) {
                                return [2 /*return*/, result];
                            }
                            _a = action.payload, api = _a.api, _b = _a.onResolve, onResolve = _b === void 0 ? noop : _b, _c = _a.onReject, onReject = _c === void 0 ? noop : _c;
                            _d.label = 1;
                        case 1:
                            _d.trys.push([1, 3, , 4]);
                            return [4 /*yield*/, send(settings, store, api)];
                        case 2:
                            resp = _d.sent();
                            onResolve(resp);
                            return [3 /*break*/, 4];
                        case 3:
                            e_1 = _d.sent();
                            onReject(e_1);
                            return [3 /*break*/, 4];
                        case 4: return [2 /*return*/];
                    }
                });
            }); };
        };
    };
};
export default createSend;
