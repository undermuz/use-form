"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var formContext_1 = require("./formContext");
var ConnectToForm = function (props) {
    var _a;
    var _b = (0, react_1.useState)(false), isFocused = _b[0], setFocus = _b[1];
    var _c = props.IsFilled, IsFilled = _c === void 0 ? Boolean : _c, children = props.children, name = props.name, inputName = props.inputName, disabled = props.disabled, _d = props.type, type = _d === void 0 ? "connect-to-form" : _d, _onRefInput = props.onRefInput, _onRef = props.onRef;
    var params = (0, formContext_1.useFormContext)();
    var _e = params.isSending, isSending = _e === void 0 ? false : _e, _f = params.values, values = _f === void 0 ? {} : _f, _g = params.touched, touched = _g === void 0 ? [] : _g, _h = params.errors, errors = _h === void 0 ? [] : _h, _j = params.fields, fields = _j === void 0 ? {} : _j, setValue = params.setValue, setTouchedByName = params.setTouchedByName;
    var value = values[name];
    var error = errors[name];
    var isTouched = touched.indexOf(name) > -1;
    var hasError = Boolean(error) && isTouched;
    var isFilled = IsFilled(value);
    var isSucceed = !hasError && isTouched && IsFilled(value);
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
    var inputProps = {
        id: "field-".concat(name),
        name: inputName || name,
        label: ((_a = children === null || children === void 0 ? void 0 : children.props) === null || _a === void 0 ? void 0 : _a.label) || fields[name],
        disabled: isSending || disabled,
        value: value,
        onChange: function (e) { var _a; return onChange === null || onChange === void 0 ? void 0 : onChange((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value); },
        onFocus: onFocus,
        onBlur: onBlur,
    };
    if (!children) {
        console.error("ConnectToForm must have a children");
        return null;
    }
    return (0, react_1.cloneElement)(children, {
        inputProps: inputProps,
        name: inputProps.name,
        value: inputProps.value,
        label: inputProps.label,
        error: hasError ? error : null,
        disabled: inputProps.disabled,
        isFocused: isFocused,
        isTouched: isTouched,
        isFilled: isFilled,
        isSucceed: isSucceed,
        isDisabled: inputProps.disabled,
        hasError: hasError,
        onChange: onChange,
        onFocus: onFocus,
        onBlur: onBlur,
        onRefInput: onRefInput,
        onRef: onRef,
    });
};
exports.default = ConnectToForm;
