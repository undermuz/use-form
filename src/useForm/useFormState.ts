import type { IFormConfig } from "./useForm"
import { formReducer, type IFormState } from "./reducer"

import { useMemo } from "react"

import getInitialState from "./getInitialState"
import createSend from "./middlewares/send"
import createValidating from "./middlewares/validate"
import useReducer, { type DispatchFunction, type IStore } from "../utils/useReducer"

export type FormState = {
    state: IFormState
    dispatch: DispatchFunction
    store: IStore<IFormState>
}

const useFormState = (props: IFormConfig): FormState => {
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

    return { state, dispatch, store }
}

export default useFormState
