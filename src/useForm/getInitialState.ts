import type { IInitialFormConfig } from "./useForm"
import { getFormErrors } from "./middlewares/validate"
import { EnumFormStatus, type IFormState } from "./reducer"

const DEF_INITIAL_STATE_OPTIONS = {
    initialValues: {},
    valueTests: [],
    fields: {},
    validate: getFormErrors,
}

const getInitialState = (
    props: Partial<IInitialFormConfig> = DEF_INITIAL_STATE_OPTIONS
): IFormState => {
    const {
        initialValues = {},
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

export default getInitialState
