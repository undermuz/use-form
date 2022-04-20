import { useCallback, useMemo } from "react";
import formReducer, { EnumFormStatus, SEND_FORM, } from "./reducer";
/* MIDDLEWARES */
import createValidating from "./middlewares/validate";
import createSend from "./middlewares/send";
/* HELPERS */
import { useIsFormValid, useSetTouched, useSetValues, useSetTests, useSetFieldValue, useSetFieldTouched, useSetValidate, useSetErrors, } from "./helpers";
import useReducer from "../useReducer/index";
const DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: () => { },
};
export const getInitialState = (props = DEF_INITIAL_STATE_OPTIONS) => {
    const { initialValues = {}, valueTests = [], fields = {}, validate: _validate, } = props;
    return {
        status: EnumFormStatus.Initial,
        isSending: false,
        isCanceling: false,
        isSuccess: false,
        sendError: null,
        values: initialValues,
        tests: valueTests,
        validate: _validate,
        touched: [],
        fields,
        errors: {},
    };
};
export const useFormControl = (props, store, dispatch) => {
    const setTouched = useSetTouched(props, store, dispatch);
    const setValues = useSetValues(props, store, dispatch);
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
        setErrors,
    };
};
const useFormCore = (props) => {
    const initialState = useMemo(() => getInitialState(props), []);
    const middlewares = useMemo(() => [
        ...((props === null || props === void 0 ? void 0 : props.middlewares) || []),
        createValidating(props),
        createSend(props),
    ], []);
    const [state, dispatch, store] = useReducer(formReducer, initialState, middlewares);
    const formControl = useFormControl(props, store, dispatch);
    const IsFormValid = useIsFormValid(props, store, dispatch);
    const send = useCallback((api) => {
        return new Promise((onResolve, onReject) => {
            dispatch({
                type: SEND_FORM,
                payload: {
                    api,
                    onResolve,
                    onReject,
                },
            });
        });
    }, []);
    return {
        ...state,
        ...formControl,
        IsFormValid,
        store,
        dispatch,
        send,
    };
};
const useForm = (props) => {
    const formConfig = useMemo(() => {
        const _config = {
            initialValues: {},
            valueTests: [],
            fields: {},
            ...(props.options || {}),
        };
        props.fields.forEach((_field) => {
            let field;
            if (typeof _field === "string") {
                field = {
                    name: _field,
                };
            }
            else {
                field = _field;
            }
            _config.fields[field.name] = field.label || field.name;
            _config.initialValues[field.name] = field.initialValue;
            if (field.rules) {
                field.rules.forEach((rule) => {
                    _config.valueTests.push([[field.name], ...rule]);
                });
            }
        });
        return _config;
    }, []);
    return useFormCore(formConfig);
};
export default useForm;
