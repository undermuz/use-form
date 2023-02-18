// src/useForm/helpers.ts
import { useCallback } from "react";
import {
  SET_ERRORS,
  SET_TESTS,
  SET_TOUCHED,
  SET_TOUCHED_FIELD,
  SET_VALIDATE,
  SET_VALUE,
  SET_VALUES
} from "./reducer.js";
var isFormHasErrors = (settings, store, checkOnlyFilled = true) => {
  const { debug } = settings;
  const state = store.getState();
  const { validate, touched, fields } = state;
  const newErrors = validate(
    {
      ...state,
      touched: checkOnlyFilled ? touched : Object.keys(fields)
    },
    debug
  );
  return [Object.keys(newErrors).length > 0, newErrors];
};
var useIsFormValid = (settings, store, _dispatch) => {
  return useCallback((checkOnlyFilled = true) => {
    return !isFormHasErrors(settings, store, checkOnlyFilled)[0];
  }, []);
};
var useSetTouched = (_settings, _store, dispatch) => {
  return useCallback(
    (newTouched, silent = false, checkOnlyFilled = true) => {
      dispatch({
        type: SET_TOUCHED,
        payload: { touched: newTouched },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetValues = (_settings, _store, dispatch) => {
  return useCallback(
    (newValues, silent = false, checkOnlyFilled = true, type = "system") => {
      dispatch({
        type: SET_VALUES,
        payload: { values: newValues, type },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetTests = (_settings, _store, dispatch) => {
  return useCallback(
    (newTests, silent = false, checkOnlyFilled = true) => {
      dispatch({
        type: SET_TESTS,
        payload: { tests: newTests },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetErrors = (_settings, _store, dispatch) => {
  return useCallback((newErrors) => {
    dispatch({
      type: SET_ERRORS,
      payload: { errors: newErrors }
    });
  }, []);
};
var useSetFieldValue = (_settings, _store, dispatch) => {
  return useCallback(
    (name, value, silent = false, checkOnlyFilled = true, type = "system") => {
      dispatch({
        type: SET_VALUE,
        payload: { name, value, type },
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
var useSetFieldTouched = (_settings, _store, dispatch) => {
  return useCallback(
    (name, value = true, silent = false) => {
      dispatch({
        type: SET_TOUCHED_FIELD,
        payload: {
          name,
          value
        },
        silent
      });
    },
    []
  );
};
var useSetValidate = (_settings, _store, dispatch) => {
  return useCallback(
    (newValidate, silent = false, checkOnlyFilled = true) => {
      dispatch({
        type: SET_VALIDATE,
        payload: newValidate,
        silent,
        checkOnlyFilled
      });
    },
    []
  );
};
export {
  isFormHasErrors,
  useIsFormValid,
  useSetErrors,
  useSetFieldTouched,
  useSetFieldValue,
  useSetTests,
  useSetTouched,
  useSetValidate,
  useSetValues
};
