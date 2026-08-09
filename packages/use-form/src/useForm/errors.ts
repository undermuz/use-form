import type { IErrors } from "./reducer"

class FormValidateError extends Error {
    errors?: IErrors

    constructor(message: string, errors?: IErrors) {
        super(message)

        this.name = "FormValidateError"
        this.errors = errors
        this.message = message

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FormValidateError.prototype)
    }
}

class FormSendError extends Error {
    errors?: IErrors
    catchError: Error

    constructor(message: string, catchError: Error, errors?: IErrors) {
        super(message)

        this.name = "FormSendError"
        this.catchError = catchError
        this.errors = errors
        this.message = message

        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FormSendError.prototype)
    }
}

/** Optional `__meta__` shape recognized by the send middleware. */
export interface FormServerErrorMeta {
    formInfo?: {
        fieldsErrors?: IErrors
    }
}

export type FormApiErrorLike = {
    message?: string
    __meta__?: FormServerErrorMeta
}

export const getFormApiErrorMeta = (
    error: unknown
): FormServerErrorMeta | undefined => {
    if (typeof error !== "object" || error === null) {
        return undefined
    }

    return (error as FormApiErrorLike).__meta__
}

export const getErrorMessage = (error: unknown): string | undefined => {
    if (typeof error !== "object" || error === null) {
        return undefined
    }

    const message = (error as FormApiErrorLike).message

    return typeof message === "string" ? message : undefined
}

export { FormValidateError, FormSendError }
