"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/useForm/index.ts
var useForm_exports = {};
__export(useForm_exports, {
  default: () => useForm_default,
  getInitialState: () => getInitialState,
  useFormControl: () => useFormControl
});
module.exports = __toCommonJS(useForm_exports);
var import_react = require("react");
var import_reducer = __toESM(require("./reducer.cjs"), 1);
var import_validate = __toESM(require("./middlewares/validate.cjs"), 1);
var import_send = __toESM(require("./middlewares/send.cjs"), 1);
var import_helpers = require("./helpers.cjs");
var import_underscore = require("underscore");
var import_useReducer = __toESM(require("../useReducer/index.cjs"), 1);
var import_utils = require("../utils.cjs");
var DEF_INITIAL_STATE_OPTIONS = {
  initialValues: {},
  valueTests: [],
  fields: {},
  validate: import_validate.getFormErrors
};
var getInitialState = (props = DEF_INITIAL_STATE_OPTIONS) => {
  const {
    initialValues = {},
    valueTests = [],
    fields = {},
    validate: _validate = import_validate.getFormErrors
  } = props;
  return {
    status: import_reducer.EnumFormStatus.Initial,
    values: initialValues,
    isSending: false,
    isCanceling: false,
    isSuccess: false,
    sendError: null,
    tests: valueTests,
    validate: _validate,
    touched: [],
    fields,
    errors: {}
  };
};
var useFormControl = (props, store, dispatch) => {
  const setValues = (0, import_helpers.useSetValues)(props, store, dispatch);
  const setTouched = (0, import_helpers.useSetTouched)(props, store, dispatch);
  const setTests = (0, import_helpers.useSetTests)(props, store, dispatch);
  const setValidate = (0, import_helpers.useSetValidate)(props, store, dispatch);
  const setErrors = (0, import_helpers.useSetErrors)(props, store, dispatch);
  const setValue = (0, import_helpers.useSetFieldValue)(props, store, dispatch);
  const setTouchedByName = (0, import_helpers.useSetFieldTouched)(props, store, dispatch);
  return {
    setValue,
    setTouchedByName,
    setTouched,
    setValues,
    setTests,
    setValidate,
    setErrors
  };
};
var useFormCore = (props) => {
  const initialState = (0, import_react.useMemo)(() => getInitialState(props), []);
  const middlewares = (0, import_react.useMemo)(
    () => [
      ...(props == null ? void 0 : props.middlewares) || [],
      (0, import_validate.default)(props),
      (0, import_send.default)(props)
    ],
    []
  );
  const [state, dispatch, store] = (0, import_useReducer.default)(
    import_reducer.default,
    initialState,
    middlewares
  );
  const formControl = useFormControl(props, store, dispatch);
  const validate = (0, import_helpers.useIsFormValid)(props, store, dispatch);
  const send = (0, import_react.useCallback)((api) => {
    return new Promise((onResolve, onReject) => {
      dispatch({
        type: import_reducer.SEND_FORM,
        payload: {
          api,
          onResolve,
          onReject
        }
      });
    });
  }, []);
  return {
    ...state,
    ...formControl,
    IsFormValid: validate,
    isFormValid: validate,
    store,
    dispatch,
    send
  };
};
var useFormConfigBySettings = (props) => {
  return (0, import_react.useMemo)(() => {
    const _config = {
      initialValues: props.value ? props.value : {},
      valueTests: [],
      fields: {},
      ...props.options || {}
    };
    Object.keys(props.fields).forEach((fieldName) => {
      var _a;
      const _field = props.fields[fieldName];
      let field;
      if (typeof _field === "string") {
        field = {
          label: _field,
          initialValue: void 0,
          rules: []
        };
      } else {
        field = _field;
      }
      _config.fields[fieldName] = field.label || fieldName;
      if (!props.value)
        _config.initialValues[fieldName] = field.initialValue;
      if ((_a = field.rules) == null ? void 0 : _a.length) {
        field.rules.forEach((rule) => {
          _config.valueTests.push([[fieldName], ...rule]);
        });
      }
    });
    return _config;
  }, []);
};
var useControlledForm = (form, props) => {
  const { value, onChange, options } = props;
  const valueRef = (0, import_react.useRef)(value);
  const onChangeRef = (0, import_utils.useRefBy)(onChange);
  const mountFlag = (0, import_react.useRef)(false);
  (0, import_react.useEffect)(() => {
    if (value && value !== valueRef.current && !(0, import_underscore.isEqual)(value, valueRef.current)) {
      if (options == null ? void 0 : options.debug)
        console.log("[useForm][Update values from external]", {
          external: value,
          current: valueRef.current
        });
      valueRef.current = value;
      form.setValues(value);
    }
  }, [value]);
  (0, import_react.useEffect)(() => {
    if (mountFlag.current) {
      if (onChangeRef.current && valueRef.current !== form.values && !(0, import_underscore.isEqual)(valueRef.current, form.values)) {
        if (options == null ? void 0 : options.debug)
          console.log("[useForm][Emit values to external]", {
            current: form.values,
            external: valueRef.current
          });
        valueRef.current = form.values;
        onChangeRef.current(form.values);
      }
    } else {
      mountFlag.current = true;
    }
  }, [form.values]);
  (0, import_react.useEffect)(() => {
    if (value && value !== form.store.getState().values) {
      if (options == null ? void 0 : options.debug)
        console.log("[useForm][Set initials values]", {
          external: value,
          current: form.store.getState().values
        });
      form.setValues(value);
    }
  }, []);
};
var useForm = (props) => {
  const formConfig = useFormConfigBySettings(props);
  const form = useFormCore(formConfig);
  useControlledForm(form, props);
  return form;
};
var useForm_default = useForm;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInitialState,
  useFormControl
});
