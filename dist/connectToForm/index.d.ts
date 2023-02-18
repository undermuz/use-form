import * as react from 'react';
import { ReactElement } from 'react';

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
declare const ConnectToForm: (props: IConnectToForm) => ReactElement<any, string | react.JSXElementConstructor<any>> | null;

export { IConnectToForm, IInputProps, ConnectToForm as default };
