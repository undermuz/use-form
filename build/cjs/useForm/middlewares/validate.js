"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFormErrors = void 0;
var tslib_1 = require("tslib");
var reducer_1 = require("../reducer");
var getFormErrors = function (state, debug) {
    if (debug === void 0) { debug = false; }
    var tests = state.tests;
    var errors = {};
    if (debug)
        console.log("[useForm][getFormErrors]", state);
    if (!(tests === null || tests === void 0 ? void 0 : tests.length)) {
        if (debug)
            console.log("[useForm][getFormErrors][Tests are not set]", state);
        return errors;
    }
    tests.forEach(function (test, index) {
        var names = test[0], testList = test[1], errorText = test[2];
        if (debug)
            console.log("[useForm][getFormErrors][Test #".concat(index + 1, "]"), {
                names: names,
                testList: testList,
                errorText: errorText,
            });
        names === null || names === void 0 ? void 0 : names.forEach(function (name) {
            var isError = false;
            if (state.touched.indexOf(name) > -1) {
                testList.forEach(function (valueTest) {
                    var value = state.values[name];
                    if (debug)
                        console.log("[useForm][getFormErrors][Test #".concat(index + 1, "][").concat(name, "][Begin]"), {
                            test: valueTest,
                            value: value,
                        });
                    if (!valueTest(value)) {
                        isError = true;
                        if (debug)
                            console.log("[useForm][getFormErrors][Test #".concat(index + 1, "][").concat(name, "][Error: ").concat(errorText, "]"), {
                                test: valueTest,
                                value: value,
                            });
                    }
                    else {
                        if (debug)
                            console.log("[useForm][getFormErrors][Test #".concat(index + 1, "][").concat(name, "][Success]"));
                    }
                });
            }
            else {
                if (debug)
                    console.log("[useForm][getFormErrors][Test #".concat(index + 1, "][").concat(name, "][Skip - isn't touched]"));
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
        console.log("[useForm][getFormErrors][Errors: ".concat(Object.keys(errors).length, "]"), errors);
    return errors;
};
exports.getFormErrors = getFormErrors;
var createValidating = function (settings) {
    if (settings === void 0) { settings = {}; }
    return function (store) {
        return function (next) {
            return function (action) {
                var _a = settings.debug, debug = _a === void 0 ? false : _a;
                var result = next(action);
                if (action.type === reducer_1.SET_VALUE ||
                    action.type === reducer_1.SET_VALUES ||
                    action.type === reducer_1.SET_TESTS ||
                    action.type === reducer_1.SET_TOUCHED_FIELD ||
                    action.type === reducer_1.SET_TOUCHED ||
                    action.type === reducer_1.SET_FIELDS ||
                    action.type === reducer_1.SET_VALIDATE ||
                    action.type === reducer_1.VALIDATE_FORM) {
                    var _b = action.silent, silent = _b === void 0 ? false : _b, _c = action.checkOnlyFilled, checkOnlyFilled = _c === void 0 ? true : _c;
                    if (!silent) {
                        var state = store.getState();
                        var _d = action.payload.validate, customValidate = _d === void 0 ? null : _d;
                        var validateFn = customValidate !== null && customValidate !== void 0 ? customValidate : state.validate;
                        var newErrors = validateFn(tslib_1.__assign(tslib_1.__assign({}, state), { touched: checkOnlyFilled
                                ? state.touched
                                : Object.keys(state.fields) }), debug);
                        store.dispatch({
                            type: reducer_1.SET_ERRORS,
                            payload: { errors: newErrors },
                        });
                    }
                }
                return result;
            };
        };
    };
};
exports.default = createValidating;
