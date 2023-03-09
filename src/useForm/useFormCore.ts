import type { IFormConfig, UseFormConfig } from "./useForm"
import type { FormState } from "./useFormState"

import { useIsFormValid } from "./helpers"
import { useFormControl } from "./useFormControl"
import { useMemo } from "react"
import type { IErrors } from "./reducer"

const useFormCore = (
    formConfig: IFormConfig,
    formState: FormState
): UseFormConfig => {
    const { state, dispatch, store } = formState

    const formControl = useFormControl(formConfig, store, dispatch)

    const validate = useIsFormValid(formConfig, store, dispatch)

    const errors = useMemo<IErrors>(() => {
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

        const allErrors: IErrors = {}

        for (const fieldName of fieldPrimaryNames) {
            const fieldErrors = []

            const fieldPrimaryErrors = state.errors[fieldName]
            const fieldSecondaryErrors = state.customErrors[fieldName]

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

            if (fieldErrors.length) allErrors[fieldName] = fieldErrors
        }

        return allErrors
    }, [state.errors, state.customErrors])

    return {
        ...state,
        ...formControl,

        errors,

        IsFormValid: validate,
        isFormValid: validate,

        store,
        dispatch,
    }
}

export { useFormCore }
