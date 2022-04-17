import { useCallback, useMemo } from "react"

import formReducer, {
    EnumFormStatus,
    IFields,
    IFormState,
    IValues,
    IValueTest,
    SEND_FORM,
} from "./reducer"

/* MIDDLEWARES */
import createValidating from "./middlewares/validate"
import createSend from "./middlewares/send"

/* HELPERS */
import {
    useIsFormValid,
    useSetTouched,
    useSetValues,
    useSetTests,
    useSetFieldValue,
    useSetFieldTouched,
    useSetValidate,
    useSetErrors,
} from "./helpers"

import useReducer, { DispatchFunction, IStore } from "../useReducer"

export interface IInitialStateOptions {
    initialValues: IValues
    valueTests: IValueTest[]
    fields: IFields
    validate: Function
}

const DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: () => {},
}

const getInitialState = (
    props: IInitialStateOptions = DEF_INITIAL_STATE_OPTIONS
): IFormState => {
    const {
        initialValues = {},
        valueTests = [],
        fields = {},
        validate: _validate,
    } = props

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
    }
}

export interface IUseFormOptions extends IInitialStateOptions {
    middlewares?: any[]
}

export const useFormControl = (
    props: IUseFormOptions,
    store: IStore<IFormState>,
    dispatch: DispatchFunction
) => {
    const setTouched = useSetTouched(props, store, dispatch)
    const setValues = useSetValues(props, store, dispatch)
    const setTests = useSetTests(props, store, dispatch)
    const setValidate = useSetValidate(props, store, dispatch)
    const setErrors = useSetErrors(props, store, dispatch)
    const setValue = useSetFieldValue(props, store, dispatch)
    const setTouchedByName = useSetFieldTouched(props, store, dispatch)

    return {
        setValue,
        setTouchedByName,
        setTouched,
        setValues,
        setTests,
        setValidate,
        setErrors,
    }
}

const useForm = (props: IUseFormOptions) => {
    const initialState = useMemo(() => getInitialState(props), [])

    const middlewares = useMemo(
        () => [
            ...(props?.middlewares || []),
            createValidating(props),
            createSend(props),
        ],
        []
    )

    const [state, dispatch, store] = useReducer<IFormState>(
        formReducer,
        initialState,
        middlewares
    )

    const formControl = useFormControl(props, store, dispatch)

    const IsFormValid = useIsFormValid(props, store, dispatch)

    const send = useCallback((api: Function) => {
        return new Promise((onResolve, onReject) => {
            dispatch({
                type: SEND_FORM,
                payload: {
                    api,
                    onResolve,
                    onReject,
                },
            })
        })
    }, [])

    return {
        ...state,
        ...formControl,
        IsFormValid,

        store,
        dispatch,

        send,
    }
}

export default useForm
