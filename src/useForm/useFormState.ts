import type { FormMiddleware, IFormConfig } from "./useForm"
import { formReducer, type IValues, type IFormState } from "./reducer"

import { useMemo } from "react"

import { getInitialState } from "./getInitialState"
import { createSend } from "./middlewares/send"
import { createValidating } from "./middlewares/validate"
import {
    useReducer,
    type DispatchFunction,
    type IStore,
    type StoreMiddleware,
} from "../utils/useReducer"
// import { createReset } from "./middlewares/reset"

export type FormState<T extends IValues = IValues> = {
    state: IFormState<T>
    dispatch: DispatchFunction
    store: IStore<IFormState<T>>
    reset: () => void
}

const useFormState = <T extends IValues = IValues>(
    props: IFormConfig<T>
): FormState<T> => {
    const initialState = useMemo(
        () => getInitialState(props) as IFormState<T>,
        []
    )

    const middlewares = useMemo(() => {
        const custom = (props?.middlewares || []) as StoreMiddleware<
            IFormState<T>
        >[]

        const builtin: FormMiddleware<T>[] = [
            createValidating(props) as FormMiddleware<T>,
            // createReset(props),
            createSend(props) as FormMiddleware<T>,
        ]

        return [...custom, ...builtin]
    }, [])

    const [state, dispatch, { store, reset }] = useReducer<IFormState<T>>(
        formReducer,
        initialState,
        middlewares,
        {
            debug: true,
        }
    )

    return { state, dispatch, store, reset }
}

export { useFormState }
