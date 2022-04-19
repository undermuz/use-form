import { cloneElement, useCallback, useMemo, useState, } from "react";
import { useFormContext } from "./formContext";
const ConnectToForm = (props) => {
    var _a, _b;
    const [focus, setFocus] = useState(false);
    const { IsFilled = Boolean, name, inputName, disabled, type = "connect-to-form", onRefInput: _onRefInput, onRef: _onRef, } = props;
    const params = useFormContext();
    const { isSending = false, values = {}, touched = [], errors = [], fields = {}, setValue, setTouchedByName, } = params;
    const value = values[name];
    const error = errors[name];
    const isTouched = touched.indexOf(name) > -1;
    const isFilled = IsFilled(value);
    const isError = Boolean(error) && isTouched;
    const isSuccess = !isError && isTouched && IsFilled(value);
    const onRefInput = useMemo(() => {
        if (_onRefInput) {
            return (node) => {
                _onRefInput(name, node);
            };
        }
        return undefined;
    }, [name, _onRefInput]);
    const onRef = useMemo(() => {
        if (_onRef) {
            return (_ref) => {
                _onRef(name, _ref);
            };
        }
        return undefined;
    }, [name, _onRef]);
    const onFocus = useCallback(() => {
        setFocus(true);
    }, []);
    const onBlur = useCallback(() => {
        setTouchedByName(name);
        setFocus(false);
    }, [setTouchedByName]);
    const onChange = useCallback((_v) => {
        setValue(name, _v, false, true, type);
    }, [setValue, name, type]);
    if (!props.children) {
        console.error("ConnectToForm must have a children");
        return null;
    }
    return cloneElement(props.children, {
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
export default ConnectToForm;
