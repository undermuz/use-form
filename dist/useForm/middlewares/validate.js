// src/useForm/middlewares/validate.ts
import {
  SET_VALUE,
  SET_VALUES,
  SET_TESTS,
  SET_TOUCHED_FIELD,
  SET_TOUCHED,
  SET_FIELDS,
  SET_VALIDATE,
  SET_ERRORS,
  VALIDATE_FORM
} from "../reducer.js";
var getFormErrors = (state, debug = false) => {
  const { tests } = state;
  let errors = {};
  debug = false;
  if (debug)
    console.log(`[useForm][getFormErrors]`, state);
  if (!(tests == null ? void 0 : tests.length)) {
    if (debug)
      console.log(`[useForm][getFormErrors][Tests are not set]`, state);
    return errors;
  }
  tests.forEach((test, index) => {
    const [names, testList, errorText] = test;
    if (debug)
      console.log(`[useForm][getFormErrors][Test #${index + 1}]`, {
        names,
        testList,
        errorText
      });
    names == null ? void 0 : names.forEach((name) => {
      let isError = false;
      if (state.touched.indexOf(name) > -1) {
        testList.forEach((valueTest) => {
          const value = state.values[name];
          if (debug)
            console.log(
              `[useForm][getFormErrors][Test #${index + 1}][${name}][Begin]`,
              {
                test: valueTest,
                value
              }
            );
          if (!valueTest(value)) {
            isError = true;
            if (debug)
              console.log(
                `[useForm][getFormErrors][Test #${index + 1}][${name}][Error: ${errorText}]`,
                {
                  test: valueTest,
                  value
                }
              );
          } else {
            if (debug)
              console.log(
                `[useForm][getFormErrors][Test #${index + 1}][${name}][Success]`
              );
          }
        });
      } else {
        if (debug)
          console.log(
            `[useForm][getFormErrors][Test #${index + 1}][${name}][Skip - isn't touched]`
          );
      }
      if (isError) {
        if (Object.keys(errors).indexOf(name) === -1) {
          errors[name] = [];
        }
        errors[name].push(errorText);
      }
    });
  });
  if (debug)
    console.log(
      `[useForm][getFormErrors][Errors: ${Object.keys(errors).length}]`,
      errors
    );
  return errors;
};
var createValidating = (settings = {}) => (store) => (next) => (action) => {
  const { debug = false } = settings;
  const result = next(action);
  if (action.type === SET_VALUE || action.type === SET_VALUES || action.type === SET_TESTS || action.type === SET_TOUCHED_FIELD || action.type === SET_TOUCHED || action.type === SET_FIELDS || action.type === SET_VALIDATE || action.type === VALIDATE_FORM) {
    const { silent = false, checkOnlyFilled = true } = action;
    if (!silent) {
      const state = store.getState();
      const { validate: customValidate = null } = action.payload;
      const validateFn = customValidate != null ? customValidate : state.validate;
      const newErrors = validateFn(
        {
          ...state,
          touched: checkOnlyFilled ? state.touched : Object.keys(state.fields)
        },
        debug
      );
      store.dispatch({
        type: SET_ERRORS,
        payload: { errors: newErrors }
      });
    }
  }
  return result;
};
var validate_default = createValidating;
export {
  validate_default as default,
  getFormErrors
};
