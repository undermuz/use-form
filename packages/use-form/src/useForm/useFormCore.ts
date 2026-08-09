import type { IFormConfig, UseFormConfig } from "./useForm"
import type { FormState } from "./useFormState"

import { useHasFormErrors, useIsFormValid } from "./helpers"
import { useFormControl } from "./useFormControl"
import { useCallback, useMemo, useRef } from "react"
import type { FieldName, IError, IErrors, IFormState, IValues } from "./reducer"
import type { IStore } from "../utils/useReducer"

const useFormCore = <T extends IValues = IValues>(
    formConfig: IFormConfig<T>,
    formState: FormState<T>
): UseFormConfig<T> => {
    const { state, dispatch, store, reset } = formState

    const formControl = useFormControl(formConfig, store, dispatch)

    const looseStore = store as IStore<IFormState>

    const isFormValid = useIsFormValid(formConfig, looseStore, dispatch)
    const hasFormErrors = useHasFormErrors(
        formConfig,
        looseStore,
        dispatch
    ) as UseFormConfig<T>["hasFormErrors"]

    const errors = useMemo<IErrors<T>>(() => {
        const _fieldNames = [
            Object.keys(state.errors),
            Object.keys(state.customErrors),
        ]

        const fieldPrimaryNamesKey =
            _fieldNames[0].length > _fieldNames[1].length ? 0 : 1
        const fieldSecondaryNamesKey = Math.abs(fieldPrimaryNamesKey - 1)

        const fieldPrimaryNames = _fieldNames[fieldPrimaryNamesKey]
        const fieldSecondaryNames = _fieldNames[fieldSecondaryNamesKey]

        for (const fieldName of fieldSecondaryNames) {
            if (!fieldPrimaryNames.includes(fieldName)) {
                fieldPrimaryNames.push(fieldName)
            }
        }

        const allErrors = {} as IErrors<T>

        for (const fieldName of fieldPrimaryNames) {
            const key = fieldName as FieldName<T>
            const fieldErrors: IError = []

            const fieldPrimaryErrors = state.errors[key]
            const fieldSecondaryErrors = state.customErrors[key]

            if (fieldPrimaryErrors) {
                if (Array.isArray(fieldPrimaryErrors)) {
                    fieldErrors.push(...fieldPrimaryErrors)
                } else {
                    fieldErrors.push(fieldPrimaryErrors)
                }
            }

            if (fieldSecondaryErrors) {
                if (Array.isArray(fieldSecondaryErrors)) {
                    fieldErrors.push(...fieldSecondaryErrors)
                } else {
                    fieldErrors.push(fieldSecondaryErrors)
                }
            }

            if (fieldErrors.length) allErrors[key] = fieldErrors
        }

        return allErrors
    }, [state.errors, state.customErrors])

    const errorsRef = useRef(errors)
    errorsRef.current = errors

    const getErrors = useCallback((): IErrors<T> => {
        return errorsRef.current
    }, [])

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { validate: _omitValidate, ...clearState } = state

    return {
        ...clearState,
        ...formControl,
        config: formConfig,

        errors,
        getErrors,

        IsFormValid: isFormValid,
        isFormValid,
        hasFormErrors,

        store,
        dispatch,
        reset,
    }
}

export { useFormCore }
