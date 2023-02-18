// src/useForm/errors.ts
var FormValidateError = class extends Error {
  constructor(message, errors) {
    super(message);
    this.name = "FormValidateError";
    this.errors = errors;
    this.message = message;
    Object.setPrototypeOf(this, FormValidateError.prototype);
  }
};
var FormSendError = class extends Error {
  constructor(message, catchError, errors) {
    super(message);
    this.name = "FormSendError";
    this.catchError = catchError;
    this.errors = errors;
    this.message = message;
    Object.setPrototypeOf(this, FormSendError.prototype);
  }
};
export {
  FormSendError,
  FormValidateError
};
