import type { IUseFormSettings, UseFormConfig } from "./useForm"
import type { FormState } from "./useFormState"

import { useIsFormValid } from "./helpers"
import useFormControl from "./useFormControl"
import useFormConfigBySettings from "./useFormConfigBySettings"

const useFormCore = (
    formSettings: IUseFormSettings,
    formState: FormState
): UseFormConfig => {
    const { state, dispatch, store } = formState

    const formConfig = useFormConfigBySettings(formSettings)

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
