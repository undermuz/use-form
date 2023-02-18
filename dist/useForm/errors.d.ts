import { IErrors } from './reducer.js';
import '../useReducer/index.js';

declare class FormValidateError extends Error {
    errors?: IErrors;
    constructor(message: string, errors?: IErrors);
}
declare class FormSendError extends Error {
    errors?: IErrors;
    catchError: Error;
    constructor(message: string, catchError: Error, errors?: IErrors);
}

export { FormSendError, FormValidateError };
