"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormControl = exports.getInitialState = void 0;
var tslib_1 = require("tslib");
var react_1 = require("react");
var reducer_1 = tslib_1.__importStar(require("./reducer"));
/* MIDDLEWARES */
var validate_1 = tslib_1.__importDefault(require("./middlewares/validate"));
var send_1 = tslib_1.__importDefault(require("./middlewares/send"));
/* HELPERS */
var helpers_1 = require("./helpers");
var index_1 = tslib_1.__importDefault(require("../useReducer/index"));
var DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: function () { },
};
var getInitialState = function (props) {
    if (props === void 0) { props = DEF_INITIAL_STATE_OPTIONS; }
    var _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, _b = props.valueTests, valueTests = _b === void 0 ? [] : _b, _c = props.fields, fields = _c === void 0 ? {} : _c, _validate = props.validate;
    return {
        status: reducer_1.EnumFormStatus.Initial,
        isSending: false,
        isCanceling: false,
        isSuccess: false,
        sendError: null,
        values: initialValues,
        tests: valueTests,
        validate: _validate,
        touched: [],
        fields: fields,
        errors: {},
    };
};
exports.getInitialState = getInitialState;
var useFormControl = function (props, store, dispatch) {
    var setTouched = (0, helpers_1.useSetTouched)(props, store, dispatch);
    var setValues = (0, helpers_1.useSetValues)(props, store, dispatch);
    var setTests = (0, helpers_1.useSetTests)(props, store, dispatch);
    var setValidate = (0, helpers_1.useSetValidate)(props, store, dispatch);
    var setErrors = (0, helpers_1.useSetErrors)(props, store, dispatch);
    var setValue = (0, helpers_1.useSetFieldValue)(props, store, dispatch);
    var setTouchedByName = (0, helpers_1.useSetFieldTouched)(props, store, dispatch);
    return {
        setValue: setValue,
        setTouchedByName: setTouchedByName,
        setTouched: setTouched,
        setValues: setValues,
        setTests: setTests,
        setValidate: setValidate,
        setErrors: setErrors,
    };
};
exports.useFormControl = useFormControl;
var useFormCore = function (props) {
    var initialState = (0, react_1.useMemo)(function () { return (0, exports.getInitialState)(props); }, []);
    var middlewares = (0, react_1.useMemo)(function () { return tslib_1.__spreadArray(tslib_1.__spreadArray([], ((props === null || props === void 0 ? void 0 : props.middlewares) || []), true), [
        (0, validate_1.default)(props),
        (0, send_1.default)(props),
    ], false); }, []);
    var _a = (0, index_1.default)(reducer_1.default, initialState, middlewares), state = _a[0], dispatch = _a[1], store = _a[2];
    var formControl = (0, exports.useFormControl)(props, store, dispatch);
    var IsFormValid = (0, helpers_1.useIsFormValid)(props, store, dispatch);
    var send = (0, react_1.useCallback)(function (api) {
        return new Promise(function (onResolve, onReject) {
            dispatch({
                type: reducer_1.SEND_FORM,
                payload: {
                    api: api,
                    onResolve: onResolve,
                    onReject: onReject,
                },
            });
        });
    }, []);
    return tslib_1.__assign(tslib_1.__assign(tslib_1.__assign({}, state), formControl), { IsFormValid: IsFormValid, store: store, dispatch: dispatch, send: send });
};
var useForm = function (props) {
    var formConfig = (0, react_1.useMemo)(function () {
        var _config = tslib_1.__assign({ initialValues: {}, valueTests: [], fields: {} }, (props.options || {}));
        Object.keys(props.fields).forEach(function (fieldName) {
            var _field = props.fields[fieldName];
            var field;
            if (typeof _field === "string") {
                field = {
                    label: _field,
                };
            }
            else {
                field = _field;
            }
            _config.fields[fieldName] = field.label || fieldName;
            _config.initialValues[fieldName] = field.initialValue;
            if (field.rules) {
                field.rules.forEach(function (rule) {
                    _config.valueTests.push(tslib_1.__spreadArray([[fieldName]], rule, true));
                });
            }
        });
        return _config;
    }, []);
    return useFormCore(formConfig);
};
exports.default = useForm;
