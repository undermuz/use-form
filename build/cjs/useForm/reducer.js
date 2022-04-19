"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formReducer = exports.sendErrorReducer = exports.isSuccessReducer = exports.isCancelingReducer = exports.isSendingReducer = exports.validateReducer = exports.fieldsReducer = exports.errorsReducer = exports.touchedReducer = exports.testsReducer = exports.valuesReducer = exports.EnumFormStatus = exports.SEND_FORM = exports.VALIDATE_FORM = exports.SET_SEND_ERROR = exports.SET_IS_SUCCESS = exports.SET_IS_CANCELING = exports.SET_IS_SENDING = exports.SET_VALIDATE = exports.SET_FIELDS = exports.SET_ERRORS = exports.SET_TOUCHED = exports.SET_TOUCHED_FIELD = exports.SET_TESTS = exports.SET_VALUE = exports.SET_VALUES = void 0;
const IsFunction = (value) => Boolean(value) &&
    ["[object Function]", "[object AsyncFunction]"].includes({}.toString.call(value));
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
const valuesReducer = (state, action) => {
    switch (action.type) {
        case exports.SET_VALUES:
            if (IsFunction(action.payload.values)) {
                return action.payload.values(state);
            }
            return action.payload.values;
        case exports.SET_VALUE:
            if (IsFunction(action.payload.value)) {
                return {
                    ...state,
                    [action.payload.name]: action.payload.value(state[action.payload.name]),
                };
            }
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        default:
            return state;
    }
};
exports.valuesReducer = valuesReducer;
const testsReducer = (state, action) => {
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
const touchedReducer = (state, action) => {
    switch (action.type) {
        case exports.SET_TOUCHED:
            if (IsFunction(action.payload.touched)) {
                return action.payload.touched(state);
            }
            return action.payload.touched;
        case exports.SET_TOUCHED_FIELD: {
            const { name, value = true } = action.payload;
            let newTouched = state;
            if (value && state.indexOf(name) === -1) {
                newTouched = [...state, name];
            }
            else if (!value && state.indexOf(name) > -1) {
                newTouched = state.filter((_n) => _n !== name);
            }
            return newTouched;
        }
        default:
            return state;
    }
};
exports.touchedReducer = touchedReducer;
const errorsReducer = (state, action) => {
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
const fieldsReducer = (state, action) => {
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
const validateReducer = (state, action) => {
    switch (action.type) {
        case exports.SET_VALIDATE:
            return action.payload.validate;
        default:
            return state;
    }
};
exports.validateReducer = validateReducer;
const isSendingReducer = (state, action) => {
    switch (action.type) {
        case exports.SET_IS_SENDING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
exports.isSendingReducer = isSendingReducer;
const isCancelingReducer = (state, action) => {
    switch (action.type) {
        case exports.SET_IS_CANCELING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
exports.isCancelingReducer = isCancelingReducer;
const isSuccessReducer = (state, action) => {
    switch (action.type) {
        case exports.SET_IS_SUCCESS:
            return Boolean(action.payload);
        default:
            return state;
    }
};
exports.isSuccessReducer = isSuccessReducer;
const sendErrorReducer = (state, action) => {
    switch (action.type) {
        case exports.SET_SEND_ERROR:
            return action.payload || null;
        default:
            return state;
    }
};
exports.sendErrorReducer = sendErrorReducer;
const formReducer = (state, action) => {
    return {
        ...state,
        values: (0, exports.valuesReducer)(state.values, action),
        fields: (0, exports.fieldsReducer)(state.fields, action),
        tests: (0, exports.testsReducer)(state.tests, action),
        touched: (0, exports.touchedReducer)(state.touched, action),
        errors: (0, exports.errorsReducer)(state.errors, action),
        validate: (0, exports.validateReducer)(state.validate, action),
        isSending: (0, exports.isSendingReducer)(state.isSending, action),
        isCanceling: (0, exports.isCancelingReducer)(state.isCanceling, action),
        isSuccess: (0, exports.isSuccessReducer)(state.isSuccess, action),
        sendError: (0, exports.sendErrorReducer)(state.sendError, action),
    };
};
exports.formReducer = formReducer;
exports.default = exports.formReducer;
