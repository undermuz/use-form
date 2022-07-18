import { __assign, __spreadArray } from "tslib";
import { useCallback, useEffect, useMemo, useRef } from "react";
import formReducer, { EnumFormStatus, SEND_FORM, } from "./reducer";
/* MIDDLEWARES */
import createValidating, { getFormErrors } from "./middlewares/validate";
import createSend from "./middlewares/send";
/* HELPERS */
import { useIsFormValid, useSetTouched, useSetValues, useSetTests, useSetFieldValue, useSetFieldTouched, useSetValidate, useSetErrors, } from "./helpers";
import { isEqual } from "underscore";
import useReducer from "../useReducer/index";
import { useRefBy } from "../utils";
var DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: getFormErrors,
};
export var getInitialState = function (props) {
    if (props === void 0) { props = DEF_INITIAL_STATE_OPTIONS; }
    var _a = props.initialValues, initialValues = _a === void 0 ? {} : _a, _b = props.valueTests, valueTests = _b === void 0 ? [] : _b, _c = props.fields, fields = _c === void 0 ? {} : _c, _d = props.validate, _validate = _d === void 0 ? getFormErrors : _d;
    return {
        status: EnumFormStatus.Initial,
        values: initialValues,
        isSending: false,
        isCanceling: false,
        isSuccess: false,
        sendError: null,
        tests: valueTests,
        validate: _validate,
        touched: [],
        fields: fields,
        errors: {},
    };
};
export var useFormControl = function (props, store, dispatch) {
    var setValues = useSetValues(props, store, dispatch);
    var setTouched = useSetTouched(props, store, dispatch);
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
    var validate = useIsFormValid(props, store, dispatch);
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
    return __assign(__assign(__assign({}, state), formControl), { IsFormValid: validate, isFormValid: validate, store: store, dispatch: dispatch, send: send });
};
var useForm = function (props) {
    var formConfig = useMemo(function () {
        var _config = __assign({ initialValues: props.value ? props.value : {}, valueTests: [], fields: {} }, (props.options || {}));
        Object.keys(props.fields).forEach(function (fieldName) {
            var _a;
            var _field = props.fields[fieldName];
            var field;
            if (typeof _field === "string") {
                field = {
                    label: _field,
                    initialValue: undefined,
                    rules: [],
                };
            }
            else {
                field = _field;
            }
            _config.fields[fieldName] = field.label || fieldName;
            if (!props.value)
                _config.initialValues[fieldName] = field.initialValue;
            if ((_a = field.rules) === null || _a === void 0 ? void 0 : _a.length) {
                field.rules.forEach(function (rule) {
                    _config.valueTests.push(__spreadArray([[fieldName]], rule, true));
                });
            }
        });
        return _config;
    }, []);
    var valueRef = useRefBy(props.value);
    var onChangeRef = useRefBy(props.onChange);
    var form = useFormCore(formConfig);
    useEffect(function () {
        var _a;
        if (props.value &&
            !isEqual(props.value, form.store.getState().values)) {
            if ((_a = props.options) === null || _a === void 0 ? void 0 : _a.debug)
                console.log("[useForm][Update values from external]", props.value);
            valueRef.current = props.value;
            form.setValues(props.value);
        }
    }, [props.value]);
    var mountFlag = useRef(false);
    useEffect(function () {
        var _a;
        if (mountFlag.current) {
            if (onChangeRef.current &&
                !isEqual(valueRef.current, form.values)) {
                if ((_a = props.options) === null || _a === void 0 ? void 0 : _a.debug)
                    console.log("[useForm][Emit values to external]", {
                        form: form.values,
                        external: valueRef.current,
                        equal: valueRef.current === form.values,
                    });
                valueRef.current = form.values;
                onChangeRef.current(form.values);
            }
        }
        else {
            mountFlag.current = true;
        }
    }, [form.values]);
    return form;
};
export default useForm;
