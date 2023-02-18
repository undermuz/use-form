import * as React from 'react';
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
declare const ConnectToForm: (props: IConnectToForm) => ReactElement<any, string | React.JSXElementConstructor<any>> | null;

export { IConnectToForm, ConnectToForm as default };
