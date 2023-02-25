import type { IUseFormOptions, UseFormConfig } from "./useForm"
import type { FormState } from "./useFormState"

import { useIsFormValid } from "./helpers"
import useFormControl from "./useFormControl"

const useFormCore = (
    formConfig: IUseFormOptions,
    formState: FormState
): UseFormConfig => {
    const { state, dispatch, store } = formState

    const formControl = useFormControl(formConfig, store, dispatch)

    const validate = useIsFormValid(formConfig, store, dispatch)

    return {
        ...state,
        ...formControl,
        IsFormValid: validate,
        isFormValid: validate,

        store,
        dispatch,
    }
}

export default useFormCore
