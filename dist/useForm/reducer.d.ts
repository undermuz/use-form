import { IAction } from '../useReducer/index.js';

declare const SET_VALUES = "set_values";
declare const SET_VALUE = "set_value";
declare const SET_TESTS = "set_tests";
declare const SET_TOUCHED_FIELD = "set_touched_field";
declare const SET_TOUCHED = "set_touched";
declare const SET_ERRORS = "set_errors";
declare const SET_FIELDS = "set_fields";
declare const SET_VALIDATE = "set_validate";
declare const SET_IS_SENDING = "set_is_sending";
declare const SET_IS_CANCELING = "set_is_canceling";
declare const SET_IS_SUCCESS = "set_is_success";
declare const SET_SEND_ERROR = "set_send_error";
declare const VALIDATE_FORM = "validate_form";
declare const SEND_FORM = "send_form";
declare type IValueTest = [Array<string>, Array<Function>, string?];
declare type ValidateFunction = (formState: IFormState, debug?: boolean) => IErrors;
interface IFields {
    [s: string]: any;
}
declare type ITouched = Array<string>;
interface IValues {
    [s: string]: any;
}
declare type IError = string[];
interface IErrors {
    [s: string]: IError;
}
declare enum EnumFormStatus {
    Initial = "initial"
}
interface IFormState {
    status: EnumFormStatus;
    isSending: boolean;
    isCanceling: boolean;
    isSuccess: boolean;
    sendError: any;
    values: IValues;
    tests: IValueTest[];
    validate: ValidateFunction;
    touched: ITouched;
    fields: IFields;
    errors: IErrors;
}
declare const valuesReducer: (state: IValues, action: IAction) => IValues;
declare const testsReducer: (state: IValueTest[], action: IAction) => IValueTest[];
declare const touchedReducer: (state: ITouched, action: IAction) => ITouched;
declare const errorsReducer: (state: IErrors, action: IAction) => IErrors;
declare const fieldsReducer: (state: IFields, action: IAction) => IFields;
declare const validateReducer: (state: ValidateFunction, action: IAction) => ValidateFunction;
declare const isSendingReducer: (state: boolean, action: IAction) => boolean;
declare const isCancelingReducer: (state: boolean, action: IAction) => boolean;
declare const isSuccessReducer: (state: boolean, action: IAction) => boolean;
declare const sendErrorReducer: (state: any, action: IAction) => any;
declare const formReducer: (state: IFormState, action: IAction) => IFormState;

export { EnumFormStatus, IError, IErrors, IFields, IFormState, ITouched, IValueTest, IValues, SEND_FORM, SET_ERRORS, SET_FIELDS, SET_IS_CANCELING, SET_IS_SENDING, SET_IS_SUCCESS, SET_SEND_ERROR, SET_TESTS, SET_TOUCHED, SET_TOUCHED_FIELD, SET_VALIDATE, SET_VALUE, SET_VALUES, VALIDATE_FORM, ValidateFunction, formReducer as default, errorsReducer, fieldsReducer, formReducer, isCancelingReducer, isSendingReducer, isSuccessReducer, sendErrorReducer, testsReducer, touchedReducer, validateReducer, valuesReducer };
