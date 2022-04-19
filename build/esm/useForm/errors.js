class FormValidateError extends Error {
    constructor(message, errors) {
        super(message);
        this.name = "FormValidateError";
        this.errors = errors;
        this.message = message;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FormValidateError.prototype);
    }
}
class FormSendError extends Error {
    constructor(message, catchError, errors) {
        super(message);
        this.name = "FormSendError";
        this.catchError = catchError;
        this.errors = errors;
        this.message = message;
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, FormSendError.prototype);
    }
}
export { FormValidateError, FormSendError };
