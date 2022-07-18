import { IAction } from "../useReducer/index";
export declare const SET_VALUES = "set_values";
export declare const SET_VALUE = "set_value";
export declare const SET_TESTS = "set_tests";
export declare const SET_TOUCHED_FIELD = "set_touched_field";
export declare const SET_TOUCHED = "set_touched";
export declare const SET_ERRORS = "set_errors";
export declare const SET_FIELDS = "set_fields";
export declare const SET_VALIDATE = "set_validate";
export declare const SET_IS_SENDING = "set_is_sending";
export declare const SET_IS_CANCELING = "set_is_canceling";
export declare const SET_IS_SUCCESS = "set_is_success";
export declare const SET_SEND_ERROR = "set_send_error";
export declare const VALIDATE_FORM = "validate_form";
export declare const SEND_FORM = "send_form";
export declare type IValueTest = [Array<string>, Array<Function>, string?];
export declare type ValidateFunction = (formState: IFormState, debug?: boolean) => IErrors;
export interface IFields {
    [s: string]: any;
}
export declare type ITouched = Array<string>;
export interface IValues {
    [s: string]: any;
}
export declare type IError = string[];
export interface IErrors {
    [s: string]: IError;
}
export declare enum EnumFormStatus {
    Initial = "initial"
}
export interface IFormState {
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
export declare const valuesReducer: (state: IValues, action: IAction) => IValues;
export declare const testsReducer: (state: IValueTest[], action: IAction) => IValueTest[];
export declare const touchedReducer: (state: ITouched, action: IAction) => ITouched;
export declare const errorsReducer: (state: IErrors, action: IAction) => IErrors;
export declare const fieldsReducer: (state: IFields, action: IAction) => IFields;
export declare const validateReducer: (state: ValidateFunction, action: IAction) => ValidateFunction;
export declare const isSendingReducer: (state: boolean, action: IAction) => boolean;
export declare const isCancelingReducer: (state: boolean, action: IAction) => boolean;
export declare const isSuccessReducer: (state: boolean, action: IAction) => boolean;
export declare const sendErrorReducer: (state: any, action: IAction) => any;
export declare const formReducer: (state: IFormState, action: IAction) => IFormState;
export default formReducer;
