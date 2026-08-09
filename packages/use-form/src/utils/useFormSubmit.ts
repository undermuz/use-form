import { useCallback } from "react"

import { useFormContext } from "../components/form-context"
import type {
    FormSendApi,
    FormSendResult,
} from "../useForm/useFormControl"
import type { IValues } from "../useForm/reducer"
import type { FormSendError, FormValidateError } from "../useForm/errors"

export type FormSubmitError = FormValidateError | FormSendError | unknown

export const useFormSubmit = <T extends IValues = IValues, R = unknown>(
    onSend: FormSendApi<T, R>,
    onSucceed: (result: FormSendResult<T, R>) => void,
    onError?: (reason: FormSubmitError) => void
) => {
    const {
        send,
        config: { debug = false },
    } = useFormContext<T>()

    const handleSave = useCallback(() => {
        if (debug) console.log(`[useFormSubmit][Start sending]`)

        send(onSend).then(onSucceed, onError)

        if (debug) console.log(`[useFormSubmit][Sent]`)
    }, [send, onSend, onSucceed, onError, debug])

    return handleSave
}
