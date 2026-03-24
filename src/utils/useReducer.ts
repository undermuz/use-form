import { useState, useCallback, useRef, useMemo } from "react"

function compose(...fns: Function[]) {
    if (fns.length === 0) return (arg: any) => arg
    if (fns.length === 1) return fns[0]

    return fns.reduce(
        (a, b) =>
            (...args: any[]) =>
                a(b(...args))
    )
}

export interface IActionPayload {
    [k: string]: any
}

export interface IAction {
    [k: string]: any
    type: string | number
    payload: IActionPayload | any
}

export type DispatchFunction = (action: IAction) => void

export interface IStore<T> {
    getState: () => T
    dispatch: DispatchFunction
}

const useReducer = <T>(
    reducer: (s: T, a: IAction) => T,
    initialState: T,
    middlewares: any[] = [],
    options?: { debug?: boolean }
): [T, DispatchFunction, { store: IStore<T>; reset: () => void }] => {
    const initialStateRef = useRef<T | null>(null)

    if (initialStateRef.current === null) {
        initialStateRef.current = { ...initialState }

        if (options?.debug)
            console.log("[useReducer][initialState]", initialStateRef.current)
    }

    const draftState = useRef(initialState)

    const [state, setState] = useState<T>(() => {
        return draftState.current
    })

    const enhancedDispatch = useMemo<DispatchFunction>(() => {
        const store: IStore<T> = {
            getState: () => draftState.current,
            dispatch: (...args) => _enhancedDispatch(...args),
        }

        const dispatch = (action: IAction) => {
            draftState.current = reducer(draftState.current, action)

            setState(draftState.current)

            return action
        }

        const chain = middlewares.map((middleware) => middleware(store))

        const _enhancedDispatch = compose(...chain)(dispatch)

        return _enhancedDispatch
    }, [])

    const store = useMemo<IStore<T>>(() => {
        return {
            getState: () => draftState.current,
            dispatch: (...args) => enhancedDispatch(...args),
        }
    }, [])

    const reset = useCallback(() => {
        draftState.current = initialStateRef.current as T

        if (options?.debug)
            console.log("[useReducer][Reset]", initialStateRef.current)

        setState(draftState.current)
    }, [])

    return [state, enhancedDispatch, { store, reset }]
}

export { useReducer }
