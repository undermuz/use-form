// src/useForm/index.ts
import { useCallback, useEffect, useMemo, useRef } from "react";
import formReducer, {
  EnumFormStatus,
  SEND_FORM
} from "./reducer.js";
import createValidating, { getFormErrors } from "./middlewares/validate.js";
import createSend from "./middlewares/send.js";
import {
  useIsFormValid,
  useSetTouched,
  useSetValues,
  useSetTests,
  useSetFieldValue,
  useSetFieldTouched,
  useSetValidate,
  useSetErrors
} from "./helpers.js";
import { isEqual } from "underscore";
import useReducer from "../useReducer/index.js";
import { useRefBy } from "../utils/index.js";
var DEF_INITIAL_STATE_OPTIONS = {
  initialValues: {},
  valueTests: [],
  fields: {},
  validate: getFormErrors
};
var getInitialState = (props = DEF_INITIAL_STATE_OPTIONS) => {
  const {
    initialValues = {},
    valueTests = [],
    fields = {},
    validate: _validate = getFormErrors
  } = props;
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
    fields,
    errors: {}
  };
};
var useFormControl = (props, store, dispatch) => {
  const setValues = useSetValues(props, store, dispatch);
  const setTouched = useSetTouched(props, store, dispatch);
  const setTests = useSetTests(props, store, dispatch);
  const setValidate = useSetValidate(props, store, dispatch);
  const setErrors = useSetErrors(props, store, dispatch);
  const setValue = useSetFieldValue(props, store, dispatch);
  const setTouchedByName = useSetFieldTouched(props, store, dispatch);
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
  const initialState = useMemo(() => getInitialState(props), []);
  const middlewares = useMemo(
    () => [
      ...(props == null ? void 0 : props.middlewares) || [],
      createValidating(props),
      createSend(props)
    ],
    []
  );
  const [state, dispatch, store] = useReducer(
    formReducer,
    initialState,
    middlewares
  );
  const formControl = useFormControl(props, store, dispatch);
  const validate = useIsFormValid(props, store, dispatch);
  const send = useCallback((api) => {
    return new Promise((onResolve, onReject) => {
      dispatch({
        type: SEND_FORM,
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
  return useMemo(() => {
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
  const valueRef = useRef(value);
  const onChangeRef = useRefBy(onChange);
  const mountFlag = useRef(false);
  useEffect(() => {
    if (value && value !== valueRef.current && !isEqual(value, valueRef.current)) {
      if (options == null ? void 0 : options.debug)
        console.log("[useForm][Update values from external]", {
          external: value,
          current: valueRef.current
        });
      valueRef.current = value;
      form.setValues(value);
    }
  }, [value]);
  useEffect(() => {
    if (mountFlag.current) {
      if (onChangeRef.current && valueRef.current !== form.values && !isEqual(valueRef.current, form.values)) {
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
  useEffect(() => {
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
export {
  useForm_default as default,
  getInitialState,
  useFormControl
};
