"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var formContext_1 = require("./formContext");
var ConnectToForm = function (props) {
    var _a, _b;
    var _c = (0, react_1.useState)(false), focus = _c[0], setFocus = _c[1];
    var _d = props.IsFilled, IsFilled = _d === void 0 ? Boolean : _d, name = props.name, inputName = props.inputName, disabled = props.disabled, _e = props.type, type = _e === void 0 ? "connect-to-form" : _e, _onRefInput = props.onRefInput, _onRef = props.onRef;
    var params = (0, formContext_1.useFormContext)();
    var _f = params.isSending, isSending = _f === void 0 ? false : _f, _g = params.values, values = _g === void 0 ? {} : _g, _h = params.touched, touched = _h === void 0 ? [] : _h, _j = params.errors, errors = _j === void 0 ? [] : _j, _k = params.fields, fields = _k === void 0 ? {} : _k, setValue = params.setValue, setTouchedByName = params.setTouchedByName;
    var value = values[name];
    var error = errors[name];
    var isTouched = touched.indexOf(name) > -1;
    var isFilled = IsFilled(value);
    var isError = Boolean(error) && isTouched;
    var isSuccess = !isError && isTouched && IsFilled(value);
    var onRefInput = (0, react_1.useMemo)(function () {
        if (_onRefInput) {
            return function (node) {
                _onRefInput(name, node);
            };
        }
        return undefined;
    }, [name, _onRefInput]);
    var onRef = (0, react_1.useMemo)(function () {
        if (_onRef) {
            return function (_ref) {
                _onRef(name, _ref);
            };
        }
        return undefined;
    }, [name, _onRef]);
    var onFocus = (0, react_1.useCallback)(function () {
        setFocus(true);
    }, []);
    var onBlur = (0, react_1.useCallback)(function () {
        setTouchedByName(name);
        setFocus(false);
    }, [setTouchedByName]);
    var onChange = (0, react_1.useCallback)(function (_v) {
        setValue(name, _v, false, true, type);
    }, [setValue, name, type]);
    if (!props.children) {
        console.error("ConnectToForm must have a children");
        return null;
    }
    return (0, react_1.cloneElement)(props.children, {
        name: inputName || name,
        value: value,
        label: ((_b = (_a = props.children) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.label) || fields[name],
        focused: focus,
        touched: isTouched,
        filled: isFilled,
        disabled: isSending || disabled,
        isError: isError,
        isSuccess: isSuccess,
        error: isError ? error : false,
        success: isSuccess,
        onChange: onChange,
        onFocus: onFocus,
        onBlur: onBlur,
        onRefInput: onRefInput,
        onRef: onRef,
    });
};
exports.default = ConnectToForm;
