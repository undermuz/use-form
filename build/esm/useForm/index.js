import { __assign, __spreadArray } from "tslib";
import { useCallback, useMemo } from "react";
import formReducer, { EnumFormStatus, SEND_FORM, } from "./reducer";
/* MIDDLEWARES */
import createValidating from "./middlewares/validate";
import createSend from "./middlewares/send";
/* HELPERS */
import { useIsFormValid, useSetTouched, useSetValues, useSetTests, useSetFieldValue, useSetFieldTouched, useSetValidate, useSetErrors, } from "./helpers";
import useReducer from "../useReducer/index";
var DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: function () { },
};
export var getInitialState = function (props) {
    if (props === void 0) { props = DEF_INITIAL_STATE_OPTIONS; }
    var _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, _b = props.valueTests, valueTests = _b === void 0 ? [] : _b, _c = props.fields, fields = _c === void 0 ? {} : _c, _validate = props.validate;
    return {
        status: EnumFormStatus.Initial,
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
export var useFormControl = function (props, store, dispatch) {
    var setTouched = useSetTouched(props, store, dispatch);
    var setValues = useSetValues(props, store, dispatch);
    var setTests = useSetTests(props, store, dispatch);
    var setValidate = useSetValidate(props, store, dispatch);
    var setErrors = useSetErrors(props, store, dispatch);
    var setValue = useSetFieldValue(props, store, dispatch);
    var setTouchedByName = useSetFieldTouched(props, store, dispatch);
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
var useFormCore = function (props) {
    var initialState = useMemo(function () { return getInitialState(props); }, []);
    var middlewares = useMemo(function () { return __spreadArray(__spreadArray([], ((props === null || props === void 0 ? void 0 : props.middlewares) || []), true), [
        createValidating(props),
        createSend(props),
    ], false); }, []);
    var _a = useReducer(formReducer, initialState, middlewares), state = _a[0], dispatch = _a[1], store = _a[2];
    var formControl = useFormControl(props, store, dispatch);
    var IsFormValid = useIsFormValid(props, store, dispatch);
    var send = useCallback(function (api) {
        return new Promise(function (onResolve, onReject) {
            dispatch({
                type: SEND_FORM,
                payload: {
                    api: api,
                    onResolve: onResolve,
                    onReject: onReject,
                },
            });
        });
    }, []);
    return __assign(__assign(__assign({}, state), formControl), { IsFormValid: IsFormValid, store: store, dispatch: dispatch, send: send });
};
var useForm = function (props) {
    var formConfig = useMemo(function () {
        var _config = __assign({ initialValues: {}, valueTests: [], fields: {} }, (props.options || {}));
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
                    _config.valueTests.push(__spreadArray([[fieldName]], rule, true));
                });
            }
        });
        return _config;
    }, []);
    return useFormCore(formConfig);
};
export default useForm;
