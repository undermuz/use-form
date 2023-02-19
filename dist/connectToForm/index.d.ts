import * as react from 'react';
import { ReactElement } from 'react';
import { IError } from '../useForm/reducer.js';
import '../useReducer/index.js';

interface IConnectToForm {
    name: string;
    inputName?: string;
    disabled?: boolean;
    type?: string;
    children: ReactElement;
    IsFilled?: (v: any) => boolean;
    onRefInput?: Function;
    onRef?: Function;
}
interface IInputProps {
    id: string;
    name: string;
    label: string;
    disabled: boolean;
    value: any;
    onChange: Function;
    onFocus: Function;
    onBlur: Function;
}
interface IConnectedProps {
    inputProps: IInputProps;
    name: string;
    value: string;
    label: string;
    error: IError | null;
    disabled: boolean;
    isFocused: boolean;
    isTouched: boolean;
    isFilled: boolean;
    isSucceed: boolean;
    isDisabled: boolean;
    hasError: boolean;
    onChange: Function;
    onFocus: Function;
    onBlur: Function;
    onRefInput?: Function;
    onRef?: Function;
}
declare const ConnectToForm: (props: IConnectToForm) => ReactElement<any, string | react.JSXElementConstructor<any>> | null;

export { IConnectToForm, IConnectedProps, IInputProps, ConnectToForm as default };
