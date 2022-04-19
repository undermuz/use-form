const IsFunction = (value) => Boolean(value) &&
    ["[object Function]", "[object AsyncFunction]"].includes({}.toString.call(value));
export const SET_VALUES = "set_values";
export const SET_VALUE = "set_value";
export const SET_TESTS = "set_tests";
export const SET_TOUCHED_FIELD = "set_touched_field";
export const SET_TOUCHED = "set_touched";
export const SET_ERRORS = "set_errors";
export const SET_FIELDS = "set_fields";
export const SET_VALIDATE = "set_validate";
export const SET_IS_SENDING = "set_is_sending";
export const SET_IS_CANCELING = "set_is_canceling";
export const SET_IS_SUCCESS = "set_is_success";
export const SET_SEND_ERROR = "set_send_error";
export const VALIDATE_FORM = "validate_form";
export const SEND_FORM = "send_form";
export var EnumFormStatus;
(function (EnumFormStatus) {
    EnumFormStatus["Initial"] = "initial";
})(EnumFormStatus || (EnumFormStatus = {}));
export const valuesReducer = (state, action) => {
    switch (action.type) {
        case SET_VALUES:
            if (IsFunction(action.payload.values)) {
                return action.payload.values(state);
            }
            return action.payload.values;
        case SET_VALUE:
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
export const testsReducer = (state, action) => {
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
export const touchedReducer = (state, action) => {
    switch (action.type) {
        case SET_TOUCHED:
            if (IsFunction(action.payload.touched)) {
                return action.payload.touched(state);
            }
            return action.payload.touched;
        case SET_TOUCHED_FIELD: {
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
export const errorsReducer = (state, action) => {
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
export const fieldsReducer = (state, action) => {
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
export const validateReducer = (state, action) => {
    switch (action.type) {
        case SET_VALIDATE:
            return action.payload.validate;
        default:
            return state;
    }
};
export const isSendingReducer = (state, action) => {
    switch (action.type) {
        case SET_IS_SENDING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
export const isCancelingReducer = (state, action) => {
    switch (action.type) {
        case SET_IS_CANCELING:
            return Boolean(action.payload);
        default:
            return state;
    }
};
export const isSuccessReducer = (state, action) => {
    switch (action.type) {
        case SET_IS_SUCCESS:
            return Boolean(action.payload);
        default:
            return state;
    }
};
export const sendErrorReducer = (state, action) => {
    switch (action.type) {
        case SET_SEND_ERROR:
            return action.payload || null;
        default:
            return state;
    }
};
export const formReducer = (state, action) => {
    return {
        ...state,
        values: valuesReducer(state.values, action),
        fields: fieldsReducer(state.fields, action),
        tests: testsReducer(state.tests, action),
        touched: touchedReducer(state.touched, action),
        errors: errorsReducer(state.errors, action),
        validate: validateReducer(state.validate, action),
        isSending: isSendingReducer(state.isSending, action),
        isCanceling: isCancelingReducer(state.isCanceling, action),
        isSuccess: isSuccessReducer(state.isSuccess, action),
        sendError: sendErrorReducer(state.sendError, action),
    };
};
export default formReducer;
