import { __assign, __spreadArray } from "tslib";
var IsFunction = function (value) {
    return Boolean(value) &&
        ["[object Function]", "[object AsyncFunction]"].includes({}.toString.call(value));
};
export var SET_VALUES = "set_values";
export var SET_VALUE = "set_value";
export var SET_TESTS = "set_tests";
export var SET_TOUCHED_FIELD = "set_touched_field";
export var SET_TOUCHED = "set_touched";
export var SET_ERRORS = "set_errors";
export var SET_FIELDS = "set_fields";
export var SET_VALIDATE = "set_validate";
export var SET_IS_SENDING = "set_is_sending";
export var SET_IS_CANCELING = "set_is_canceling";
export var SET_IS_SUCCESS = "set_is_success";
export var SET_SEND_ERROR = "set_send_error";
export var VALIDATE_FORM = "validate_form";
export var SEND_FORM = "send_form";
export var EnumFormStatus;
(function (EnumFormStatus) {
    EnumFormStatus["Initial"] = "initial";
})(EnumFormStatus || (EnumFormStatus = {}));
export var valuesReducer = function (state, action) {
    var _a, _b;
    switch (action.type) {
        case SET_VALUES:
            if (IsFunction(action.payload.values)) {
                return action.payload.values(state);
            }
            return action.payload.values;
        case SET_VALUE:
            if (IsFunction(action.payload.value)) {
                return __assign(__assign({}, state), (_a = {}, _a[action.payload.name] = action.payload.value(state[action.payload.name]), _a));
            }
            return __assign(__assign({}, state), (_b = {}, _b[action.payload.name] = action.payload.value, _b));
        default:
            return state;
    }
};
export var testsReducer = function (state, action) {
    switch (action.type) {
        case SET_TESTS:
            if (IsFunction(action.payload.tests)) {
                return action.payload.tests(state);
            }
            return action.payload.tests;
        default:
            return state;
    }
};
export var touchedReducer = function (state, action) {
    switch (action.type) {
        case SET_TOUCHED:
            if (IsFunction(action.payload.touched)) {
                return action.payload.touched(state);
            }
            return action.payload.touched;
        case SET_TOUCHED_FIELD: {
            var _a = action.payload, name_1 = _a.name, _b = _a.value, value = _b === void 0 ? true : _b;
            var newTouched = state;
            if (value && state.indexOf(name_1) === -1) {
                newTouched = __spreadArray(__spreadArray([], state, true), [name_1], false);
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
export var errorsReducer = function (state, action) {
    switch (action.type) {
        case SET_ERRORS:
            if (IsFunction(action.payload.errors)) {
                return action.payload.errors(state);
            }
            return action.payload.errors;
        default:
            return state;
    }
};
export var fieldsReducer = function (state, action) {
    switch (action.type) {
        case SET_FIELDS:
            if (IsFunction(action.payload.fields)) {
                return action.payload.fields(state);
            }
            return action.payload.fields;
        default:
            return state;
    }
};
export var validateReducer = function (state, action) {
    switch (action.type) {
        case SET_VALIDATE:
            return action.payload.validate;
        default:
            return state;
    }
};
export var isSendingReducer = function (state, action) {
    switch (action.type) {
        case SET_IS_SENDING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
export var isCancelingReducer = function (state, action) {
    switch (action.type) {
        case SET_IS_CANCELING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
export var isSuccessReducer = function (state, action) {
    switch (action.type) {
        case SET_IS_SUCCESS:
            return Boolean(action.payload);
        default:
            return state;
    }
};
export var sendErrorReducer = function (state, action) {
    switch (action.type) {
        case SET_SEND_ERROR:
            return action.payload || null;
        default:
            return state;
    }
};
export var formReducer = function (state, action) {
    return __assign(__assign({}, state), { values: valuesReducer(state.values, action), fields: fieldsReducer(state.fields, action), tests: testsReducer(state.tests, action), touched: touchedReducer(state.touched, action), errors: errorsReducer(state.errors, action), validate: validateReducer(state.validate, action), isSending: isSendingReducer(state.isSending, action), isCanceling: isCancelingReducer(state.isCanceling, action), isSuccess: isSuccessReducer(state.isSuccess, action), sendError: sendErrorReducer(state.sendError, action) });
};
export default formReducer;
