// src/connectToForm/index.tsx
import {
  cloneElement,
  useCallback,
  useMemo,
  useState
} from "react";
import { useFormContext } from "./formContext.js";
var ConnectToForm = (props) => {
  var _a;
  const [isFocused, setFocus] = useState(false);
  const {
    IsFilled = Boolean,
    children,
    name,
    inputName,
    disabled,
    type = "connect-to-form",
    onRefInput: _onRefInput,
    onRef: _onRef
  } = props;
  const params = useFormContext();
  const {
    isSending = false,
    values = {},
    touched = [],
    errors = {},
    fields = {},
    setValue,
    setTouchedByName
  } = params;
  const value = values[name];
  const error = errors[name];
  const isTouched = touched.indexOf(name) > -1;
  const hasError = Boolean(error) && isTouched;
  const isFilled = IsFilled(value);
  const isSucceed = !hasError && isTouched && IsFilled(value);
  const onRefInput = useMemo(() => {
    if (_onRefInput) {
      return (node) => {
        _onRefInput(name, node);
      };
    }
    return void 0;
  }, [name, _onRefInput]);
  const onRef = useMemo(() => {
    if (_onRef) {
      return (_ref) => {
        _onRef(name, _ref);
      };
    }
    return void 0;
  }, [name, _onRef]);
  const onFocus = useCallback(() => {
    setFocus(true);
  }, []);
  const onBlur = useCallback(() => {
    setTouchedByName(name);
    setFocus(false);
  }, [setTouchedByName]);
  const onChange = useCallback(
    (_v) => {
      setValue(name, _v, false, true, type);
    },
    [setValue, name, type]
  );
  const inputProps = {
    id: `field-${name}`,
    name: inputName || name,
    label: ((_a = children == null ? void 0 : children.props) == null ? void 0 : _a.label) || fields[name],
    disabled: isSending || disabled || false,
    value,
    onChange: (e) => {
      var _a2;
      return onChange == null ? void 0 : onChange((_a2 = e == null ? void 0 : e.target) == null ? void 0 : _a2.value);
    },
    onFocus,
    onBlur
  };
  if (!children) {
    console.error("ConnectToForm must have a children");
    return null;
  }
  return cloneElement(children, {
    inputProps,
    name: inputProps.name,
    value: inputProps.value,
    label: inputProps.label,
    error: hasError ? error : null,
    disabled: inputProps.disabled,
    isFocused,
    isTouched,
    isFilled,
    isSucceed,
    isDisabled: inputProps.disabled,
    hasError,
    onChange,
    onFocus,
    onBlur,
    onRefInput,
    onRef
  });
};
var connectToForm_default = ConnectToForm;
export {
  connectToForm_default as default
};
