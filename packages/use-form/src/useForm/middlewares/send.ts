const noop = () => {}

import type { DispatchFunction, IAction, IStore } from "../../utils/useReducer"
import {
    FormSendError,
    FormValidateError,
    getErrorMessage,
    getFormApiErrorMeta,
} from "../errors"
import { isFormHasErrors, type IUseIsFormSettings } from "../helpers"

import {
    FORM_ACTIONS,
    type ITouched,
    type IFormState,
    type IErrors,
    type IValues,
} from "../reducer"
import type { FormSendApi, FormSendResult } from "../useFormControl"

const setIsSending = (value: boolean): IAction => {
    return {
        type: FORM_ACTIONS.SET_IS_SENDING,
        payload: value,
    }
}

const setIsCanceling = (value: boolean): IAction => {
    return {
        type: FORM_ACTIONS.SET_IS_CANCELING,
        payload: value,
    }
}

const setIsSuccess = (value: boolean): IAction => {
    return {
        type: FORM_ACTIONS.SET_IS_SUCCESS,
        payload: value,
    }
}

const setErrors = (value: IErrors): IAction => {
    return {
        type: FORM_ACTIONS.SET_ERRORS,
        payload: { errors: value },
    }
}

const setTouched = (value: ITouched, silent = false): IAction => {
    return {
        type: FORM_ACTIONS.SET_TOUCHED,
        payload: { touched: value },
        silent,
    }
}

const setSendError = (value: unknown | null): IAction => {
    return {
        type: FORM_ACTIONS.SET_SEND_ERROR,
        payload: value,
    }
}

const send = async <T extends IValues = IValues, R = unknown>(
    settings: IUseIsFormSettings,
    store: IStore<IFormState<T>>,
    api: FormSendApi<T, R>
): Promise<FormSendResult<T, R>> => {
    const {
        mapServerFields = {},
        afterSendDelay,
        debug = false,
    } = settings

    const state = store.getState()
    const d = store.dispatch

    d(setIsSending(true))

    d(setTouched(Object.keys(state.fields), true))

    const [isFormInvalid, formErrors] = isFormHasErrors(
        settings,
        store as IStore<IFormState>,
        false
    )

    if (debug)
        console.log(
            `[useForm][send][Is form valid: ${isFormInvalid ? "no" : "yes"}]`,
            formErrors
        )

    if (isFormInvalid) {
        d(setErrors(formErrors))
        d(setIsCanceling(true))

        setTimeout(() => {
            d(setIsCanceling(false))
        }, afterSendDelay)

        d(setIsSending(false))

        throw new FormValidateError("Form is invalid")
    }

    try {
        d(setSendError(null))

        if (debug) console.log(`[useForm][send][Sending]`, state.values)

        const resp = await api(state.values)

        if (debug) console.log(`[useForm][send][Success]`)

        d(setIsSuccess(true))

        setTimeout(() => {
            d(setIsSuccess(false))
        }, afterSendDelay)

        d(setIsSending(false))

        return { response: resp, values: state.values }
    } catch (error) {
        const _errors: IErrors = {}
        let hasErrors = false

        const formInfo = getFormApiErrorMeta(error)?.formInfo
        const fieldsErrors = formInfo?.fieldsErrors

        if (fieldsErrors) {
            Object.keys(fieldsErrors).forEach((fieldName) => {
                const realFieldName = mapServerFields[fieldName] ?? fieldName
                const fieldError = fieldsErrors[fieldName]

                if (!fieldError) {
                    return
                }

                hasErrors = true
                _errors[realFieldName] = fieldError
            })
        }

        if (debug) {
            console.error(`[useForm][send][Fail]`, getErrorMessage(error))
            console.error(error)
        }

        d(setSendError(error))

        d(setIsCanceling(true))

        setTimeout(() => {
            d(setIsCanceling(false))
        }, afterSendDelay)

        d(setIsSending(false))

        if (hasErrors) {
            d(setErrors(_errors))
        }

        throw new FormSendError("Request has failed", error as Error, _errors)
    }
}

const createSend =
    (settings: IUseIsFormSettings) =>
    (store: IStore<IFormState>) =>
    (next: DispatchFunction) =>
    async (action: IAction) => {
        const { debug = false } = settings

        const result = next(action)

        if (action.type !== FORM_ACTIONS.SEND_FORM) {
            return result
        }

        const { api, onResolve = noop, onReject = noop } = action.payload as {
            api: FormSendApi
            onResolve?: (resp: FormSendResult) => void
            onReject?: (error: unknown) => void
        }

        try {
            if (debug) console.log(`[useForm][send][Start sending]`)

            const resp = await send(settings, store, api)

            if (debug) console.log(`[useForm][send][Success]`)

            onResolve(resp)

            // return resp
        } catch (e) {
            if (debug) console.error(`[useForm][send][Error]`, e)

            onReject(e)

            // throw e
        }
    }

export { createSend }
