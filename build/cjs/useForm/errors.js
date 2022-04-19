"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormSendError = exports.FormValidateError = void 0;
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
exports.FormValidateError = FormValidateError;
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
exports.FormSendError = FormSendError;
