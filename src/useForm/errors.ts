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

export { FormValidateError, FormSendError }
