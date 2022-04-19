"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormErrors = void 0;
const reducer_1 = require("../reducer");
const getFormErrors = (state, debug = false) => {
    const { tests } = state;
    let errors = {};
    if (debug)
        console.log(`[useForm][getFormErrors]`, state);
    if (!(tests === null || tests === void 0 ? void 0 : tests.length)) {
        if (debug)
            console.log(`[useForm][getFormErrors][Tests are not set]`, state);
        return errors;
    }
    tests.forEach((test, index) => {
        const [names, testList, errorText] = test;
        if (debug)
            console.log(`[useForm][getFormErrors][Test #${index + 1}]`, {
                names,
                testList,
                errorText,
            });
        names === null || names === void 0 ? void 0 : names.forEach((name) => {
            let isError = false;
            if (state.touched.indexOf(name) > -1) {
                testList.forEach((valueTest) => {
                    const value = state.values[name];
                    if (debug)
                        console.log(`[useForm][getFormErrors][Test #${index + 1}][${name}][Begin]`, {
                            test: valueTest,
                            value,
                        });
                    if (!valueTest(value)) {
                        isError = true;
                        if (debug)
                            console.log(`[useForm][getFormErrors][Test #${index + 1}][${name}][Error: ${errorText}]`, {
                                test: valueTest,
                                value: value,
                            });
                    }
                    else {
                        if (debug)
                            console.log(`[useForm][getFormErrors][Test #${index + 1}][${name}][Success]`);
                    }
                });
            }
            else {
                if (debug)
                    console.log(`[useForm][getFormErrors][Test #${index + 1}][${name}][Skip - isn't touched]`);
            }
            if (isError) {
                if (Object.keys(errors).indexOf(name) === -1) {
                    //@ts-ignore
                    errors[name] = [];
                }
                //@ts-ignore
                errors[name].push(errorText);
            }
        });
    });
    if (debug)
        console.log(`[useForm][getFormErrors][Errors: ${Object.keys(errors).length}]`, errors);
    return errors;
};
exports.getFormErrors = getFormErrors;
const createValidating = (settings = {}) => (store) => (next) => (action) => {
    const { log = true } = settings;
    const result = next(action);
    if (action.type === reducer_1.SET_VALUE ||
        action.type === reducer_1.SET_VALUES ||
        action.type === reducer_1.SET_TESTS ||
        action.type === reducer_1.SET_TOUCHED_FIELD ||
        action.type === reducer_1.SET_TOUCHED ||
        action.type === reducer_1.SET_FIELDS ||
        action.type === reducer_1.SET_VALIDATE ||
        action.type === reducer_1.VALIDATE_FORM) {
        const { silent = false, checkOnlyFilled = true } = action;
        if (!silent) {
            const { validate: customValidate = null } = action.payload;
            const validateFn = customValidate !== null && customValidate !== void 0 ? customValidate : exports.getFormErrors;
            const state = store.getState();
            const newErrors = validateFn({
                ...state,
                touched: checkOnlyFilled
                    ? state.touched
                    : Object.keys(state.fields),
            }, log);
            store.dispatch({
                type: reducer_1.SET_ERRORS,
                payload: { errors: newErrors },
            });
        }
    }
    return result;
};
exports.default = createValidating;
