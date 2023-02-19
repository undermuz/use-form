"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/connectToForm/index.tsx
var connectToForm_exports = {};
__export(connectToForm_exports, {
  default: () => connectToForm_default
});
module.exports = __toCommonJS(connectToForm_exports);
var import_react = require("react");
var import_formContext = require("./formContext.cjs");
var ConnectToForm = (props) => {
  var _a;
  const [isFocused, setFocus] = (0, import_react.useState)(false);
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
  const params = (0, import_formContext.useFormContext)();
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
  const onRefInput = (0, import_react.useMemo)(() => {
    if (_onRefInput) {
      return (node) => {
        _onRefInput(name, node);
      };
    }
    return void 0;
  }, [name, _onRefInput]);
  const onRef = (0, import_react.useMemo)(() => {
    if (_onRef) {
      return (_ref) => {
        _onRef(name, _ref);
      };
    }
    return void 0;
  }, [name, _onRef]);
  const onFocus = (0, import_react.useCallback)(() => {
    setFocus(true);
  }, []);
  const onBlur = (0, import_react.useCallback)(() => {
    setTouchedByName(name);
    setFocus(false);
  }, [setTouchedByName]);
  const onChange = (0, import_react.useCallback)(
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
  const connectedProps = {
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
  };
  return (0, import_react.cloneElement)(children, connectedProps);
};
var connectToForm_default = ConnectToForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
