import { IErrors } from "./reducer";
declare class FormValidateError extends Error {
    errors?: IErrors;
    constructor(message: string, errors?: IErrors);
}
declare class FormSendError extends Error {
    errors?: IErrors;
    catchError: Error;
    constructor(message: string, catchError: Error, errors?: IErrors);
}
export { FormValidateError, FormSendError };
