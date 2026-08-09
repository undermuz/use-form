import type { IInitialFormConfig } from "./useForm"
import { getFormErrors } from "./middlewares/validate"
import { EnumFormStatus, type IFormState, type IValues } from "./reducer"

const getInitialState = <T extends IValues = IValues>(
    props: Partial<IInitialFormConfig<T>> = {}
): IFormState<T> => {
    const {
        initialValues = {} as T,
        valueTests = [],
        fields = {},
        validate: _validate = getFormErrors,
    } = props

    return {
        status: EnumFormStatus.Initial,
        values: initialValues,
        isSending: false,
        isCanceling: false,
        isSuccess: false,
        sendError: null,
        tests: valueTests,
        validate: _validate,
        touched: [],
        fields,
        errors: {},
        customErrors: {},
    }
}

export { getInitialState }
