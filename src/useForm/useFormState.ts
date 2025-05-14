import type { IFormConfig } from "./useForm"
import { formReducer, type IValues, type IFormState } from "./reducer"

import { useMemo } from "react"

import { getInitialState } from "./getInitialState"
import { createSend } from "./middlewares/send"
import { createValidating } from "./middlewares/validate"
import {
    useReducer,
    type DispatchFunction,
    type IStore,
} from "../utils/useReducer"

export type FormState<T extends IValues = IValues> = {
    state: IFormState<T>
    dispatch: DispatchFunction
    store: IStore<IFormState<T>>
}

const useFormState = <T extends IValues = IValues>(
    props: IFormConfig
): FormState<T> => {
    const initialState = useMemo(
        () => getInitialState(props) as IFormState<T>,
        []
    )

    const middlewares = useMemo(
        () => [
            ...(props?.middlewares || []),
            createValidating(props),
            createSend(props),
        ],
        []
    )

    const [state, dispatch, store] = useReducer<IFormState<T>>(
        formReducer,
        initialState,
        middlewares
    )

    return { state, dispatch, store }
}

export { useFormState }
