"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const formContext_1 = require("./formContext");
const ConnectToForm = (props) => {
    var _a, _b;
    const [focus, setFocus] = (0, react_1.useState)(false);
    const { IsFilled = Boolean, name, inputName, disabled, type = "connect-to-form", onRefInput: _onRefInput, onRef: _onRef, } = props;
    const params = (0, formContext_1.useFormContext)();
    const { isSending = false, values = {}, touched = [], errors = [], fields = {}, setValue, setTouchedByName, } = params;
    const value = values[name];
    const error = errors[name];
    const isTouched = touched.indexOf(name) > -1;
    const isFilled = IsFilled(value);
    const isError = Boolean(error) && isTouched;
    const isSuccess = !isError && isTouched && IsFilled(value);
    const onRefInput = (0, react_1.useMemo)(() => {
        if (_onRefInput) {
            return (node) => {
                _onRefInput(name, node);
            };
        }
        return undefined;
    }, [name, _onRefInput]);
    const onRef = (0, react_1.useMemo)(() => {
        if (_onRef) {
            return (_ref) => {
                _onRef(name, _ref);
            };
        }
        return undefined;
    }, [name, _onRef]);
    const onFocus = (0, react_1.useCallback)(() => {
        setFocus(true);
    }, []);
    const onBlur = (0, react_1.useCallback)(() => {
        setTouchedByName(name);
        setFocus(false);
    }, [setTouchedByName]);
    const onChange = (0, react_1.useCallback)((_v) => {
        setValue(name, _v, false, true, type);
    }, [setValue, name, type]);
    if (!props.children) {
        console.error("ConnectToForm must have a children");
        return null;
    }
    return (0, react_1.cloneElement)(props.children, {
        name: inputName || name,
        value,
        label: ((_b = (_a = props.children) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.label) || fields[name],
        focused: focus,
        touched: isTouched,
        filled: isFilled,
        disabled: isSending || disabled,
        isError,
        isSuccess,
        error: isError ? error : false,
        success: isSuccess,
        onChange,
        onFocus,
        onBlur,
        onRefInput,
        onRef,
    });
};
exports.default = ConnectToForm;
