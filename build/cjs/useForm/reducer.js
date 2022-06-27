"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formReducer = exports.sendErrorReducer = exports.isSuccessReducer = exports.isCancelingReducer = exports.isSendingReducer = exports.validateReducer = exports.fieldsReducer = exports.errorsReducer = exports.touchedReducer = exports.testsReducer = exports.valuesReducer = exports.EnumFormStatus = exports.SEND_FORM = exports.VALIDATE_FORM = exports.SET_SEND_ERROR = exports.SET_IS_SUCCESS = exports.SET_IS_CANCELING = exports.SET_IS_SENDING = exports.SET_VALIDATE = exports.SET_FIELDS = exports.SET_ERRORS = exports.SET_TOUCHED = exports.SET_TOUCHED_FIELD = exports.SET_TESTS = exports.SET_VALUE = exports.SET_VALUES = void 0;
var tslib_1 = require("tslib");
var validate_1 = require("./middlewares/validate");
var IsFunction = function (value) {
    return Boolean(value) &&
        ["[object Function]", "[object AsyncFunction]"].includes({}.toString.call(value));
};
exports.SET_VALUES = "set_values";
exports.SET_VALUE = "set_value";
exports.SET_TESTS = "set_tests";
exports.SET_TOUCHED_FIELD = "set_touched_field";
exports.SET_TOUCHED = "set_touched";
exports.SET_ERRORS = "set_errors";
exports.SET_FIELDS = "set_fields";
exports.SET_VALIDATE = "set_validate";
exports.SET_IS_SENDING = "set_is_sending";
exports.SET_IS_CANCELING = "set_is_canceling";
exports.SET_IS_SUCCESS = "set_is_success";
exports.SET_SEND_ERROR = "set_send_error";
exports.VALIDATE_FORM = "validate_form";
exports.SEND_FORM = "send_form";
var EnumFormStatus;
(function (EnumFormStatus) {
    EnumFormStatus["Initial"] = "initial";
})(EnumFormStatus = exports.EnumFormStatus || (exports.EnumFormStatus = {}));
var valuesReducer = function (state, action) {
    var _a, _b;
    switch (action.type) {
        case exports.SET_VALUES:
            if (IsFunction(action.payload.values)) {
                return action.payload.values(state);
            }
            return action.payload.values;
        case exports.SET_VALUE:
            if (IsFunction(action.payload.value)) {
                return tslib_1.__assign(tslib_1.__assign({}, state), (_a = {}, _a[action.payload.name] = action.payload.value(state[action.payload.name]), _a));
            }
            return tslib_1.__assign(tslib_1.__assign({}, state), (_b = {}, _b[action.payload.name] = action.payload.value, _b));
        default:
            return state;
    }
};
exports.valuesReducer = valuesReducer;
var testsReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_TESTS:
            if (IsFunction(action.payload.tests)) {
                return action.payload.tests(state);
            }
            return action.payload.tests;
        default:
            return state;
    }
};
exports.testsReducer = testsReducer;
var touchedReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_TOUCHED:
            if (IsFunction(action.payload.touched)) {
                return action.payload.touched(state);
            }
            return action.payload.touched;
        case exports.SET_TOUCHED_FIELD: {
            var _a = action.payload, name_1 = _a.name, _b = _a.value, value = _b === void 0 ? true : _b;
            var newTouched = state;
            if (value && state.indexOf(name_1) === -1) {
                newTouched = tslib_1.__spreadArray(tslib_1.__spreadArray([], state, true), [name_1], false);
            }
            else if (!value && state.indexOf(name_1) > -1) {
                newTouched = state.filter(function (_n) { return _n !== name_1; });
            }
            return newTouched;
        }
        default:
            return state;
    }
};
exports.touchedReducer = touchedReducer;
var errorsReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_ERRORS:
            if (IsFunction(action.payload.errors)) {
                return action.payload.errors(state);
            }
            return action.payload.errors;
        default:
            return state;
    }
};
exports.errorsReducer = errorsReducer;
var fieldsReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_FIELDS:
            if (IsFunction(action.payload.fields)) {
                return action.payload.fields(state);
            }
            return action.payload.fields;
        default:
            return state;
    }
};
exports.fieldsReducer = fieldsReducer;
var validateReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_VALIDATE:
            if (!action.payload.validate) {
                return validate_1.getFormErrors;
            }
            return action.payload.validate;
        default:
            return state;
    }
};
exports.validateReducer = validateReducer;
var isSendingReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_IS_SENDING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
exports.isSendingReducer = isSendingReducer;
var isCancelingReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_IS_CANCELING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
exports.isCancelingReducer = isCancelingReducer;
var isSuccessReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_IS_SUCCESS:
            return Boolean(action.payload);
        default:
            return state;
    }
};
exports.isSuccessReducer = isSuccessReducer;
var sendErrorReducer = function (state, action) {
    switch (action.type) {
        case exports.SET_SEND_ERROR:
            return action.payload || null;
        default:
            return state;
    }
};
exports.sendErrorReducer = sendErrorReducer;
var formReducer = function (state, action) {
    var nextState = tslib_1.__assign(tslib_1.__assign({}, state), { values: (0, exports.valuesReducer)(state.values, action), fields: (0, exports.fieldsReducer)(state.fields, action), tests: (0, exports.testsReducer)(state.tests, action), touched: (0, exports.touchedReducer)(state.touched, action), errors: (0, exports.errorsReducer)(state.errors, action), validate: (0, exports.validateReducer)(state.validate, action), isSending: (0, exports.isSendingReducer)(state.isSending, action), isCanceling: (0, exports.isCancelingReducer)(state.isCanceling, action), isSuccess: (0, exports.isSuccessReducer)(state.isSuccess, action), sendError: (0, exports.sendErrorReducer)(state.sendError, action) });
    return nextState;
};
exports.formReducer = formReducer;
exports.default = exports.formReducer;
