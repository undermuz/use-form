"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormControl = exports.getInitialState = void 0;
const tslib_1 = require("tslib");
const react_1 = require("react");
const reducer_1 = tslib_1.__importStar(require("./reducer"));
/* MIDDLEWARES */
const validate_1 = tslib_1.__importDefault(require("./middlewares/validate"));
const send_1 = tslib_1.__importDefault(require("./middlewares/send"));
/* HELPERS */
const helpers_1 = require("./helpers");
const index_1 = tslib_1.__importDefault(require("../useReducer/index"));
const DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: () => { },
};
const getInitialState = (props = DEF_INITIAL_STATE_OPTIONS) => {
    const { initialValues = {}, valueTests = [], fields = {}, validate: _validate, } = props;
    return {
        status: reducer_1.EnumFormStatus.Initial,
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
exports.getInitialState = getInitialState;
const useFormControl = (props, store, dispatch) => {
    const setTouched = (0, helpers_1.useSetTouched)(props, store, dispatch);
    const setValues = (0, helpers_1.useSetValues)(props, store, dispatch);
    const setTests = (0, helpers_1.useSetTests)(props, store, dispatch);
    const setValidate = (0, helpers_1.useSetValidate)(props, store, dispatch);
    const setErrors = (0, helpers_1.useSetErrors)(props, store, dispatch);
    const setValue = (0, helpers_1.useSetFieldValue)(props, store, dispatch);
    const setTouchedByName = (0, helpers_1.useSetFieldTouched)(props, store, dispatch);
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
exports.useFormControl = useFormControl;
const useForm = (props) => {
    const initialState = (0, react_1.useMemo)(() => (0, exports.getInitialState)(props), []);
    const middlewares = (0, react_1.useMemo)(() => [
        ...((props === null || props === void 0 ? void 0 : props.middlewares) || []),
        (0, validate_1.default)(props),
        (0, send_1.default)(props),
    ], []);
    const [state, dispatch, store] = (0, index_1.default)(reducer_1.default, initialState, middlewares);
    const formControl = (0, exports.useFormControl)(props, store, dispatch);
    const IsFormValid = (0, helpers_1.useIsFormValid)(props, store, dispatch);
    const send = (0, react_1.useCallback)((api) => {
        return new Promise((onResolve, onReject) => {
            dispatch({
                type: reducer_1.SEND_FORM,
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
exports.default = useForm;
