const noop = () => {}

import type { DispatchFunction, IAction, IStore } from "../../useReducer/index"
import { FormSendError, FormValidateError } from "../errors"
import { isFormHasErrors, type IUseFormSettings } from "../helpers"

import {
    SET_ERRORS,
    SET_IS_SENDING,
    SET_IS_CANCELING,
    SET_IS_SUCCESS,
    SET_SEND_ERROR,
    SEND_FORM,
    SET_TOUCHED,
    type ITouched,
    type IFormState,
    type IErrors,
} from "../reducer"

const setIsSending = (value: boolean): IAction => {
    return {
        type: SET_IS_SENDING,
        payload: value,
    }
}

const setIsCanceling = (value: boolean): IAction => {
    return {
        type: SET_IS_CANCELING,
        payload: value,
    }
}

const setIsSuccess = (value: boolean): IAction => {
    return {
        type: SET_IS_SUCCESS,
        payload: value,
    }
}

const setErrors = (value: IErrors): IAction => {
    return {
        type: SET_ERRORS,
        payload: { errors: value },
    }
}

const setTouched = (value: ITouched, silent = false): IAction => {
    return {
        type: SET_TOUCHED,
        payload: { touched: value },
        silent,
    }
}

const setSendError = (value: any): IAction => {
    return {
        type: SET_SEND_ERROR,
        payload: value,
    }
}

const send = async (
    settings: IUseFormSettings,
    store: IStore<IFormState>,
    api: Function
) => {
    const { mapServerFields, afterSendDelay, debug = false } = settings

    const state = store.getState()
    const d = store.dispatch

    d(setIsSending(true))

    d(setTouched(Object.keys(state.fields), true))

    const [isFormInvalid, formErrors] = isFormHasErrors(settings, store, false)

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

        //@ts-ignore
        if (error?.__meta__?.formInfo) {
            //@ts-ignore
            const { formInfo } = error.__meta__

            //@ts-ignore
            if (formInfo.fieldsErrors) {
                Object.keys(formInfo.fieldsErrors).forEach((fieldName) => {
                    const realFieldName =
                        mapServerFields[fieldName] ?? fieldName

                    hasErrors = true
                    _errors[realFieldName] = formInfo.fieldsErrors[fieldName]
                })
            }
        }

        if (debug) {
            //@ts-ignore
            console.error(`[useForm][send][Fail]`, error?.message)
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
    (settings: IUseFormSettings) =>
    (store: IStore<IFormState>) =>
    (next: DispatchFunction) =>
    async (action: IAction) => {
        const result = next(action)

        if (action.type !== SEND_FORM) {
            return result
        }

        const { api, onResolve = noop, onReject = noop } = action.payload

        try {
            const resp = await send(settings, store, api)

            onResolve(resp)

            // return resp
        } catch (e) {
            onReject(e)

            // throw e
        }
    }

export default createSend
