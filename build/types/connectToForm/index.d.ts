import { ReactElement } from "react";
export interface IConnectToForm {
    name: string;
    inputName?: string;
    disabled?: boolean;
    type?: string;
    children: ReactElement;
    IsFilled?: (v: any) => boolean;
    onRefInput?: Function;
    onRef?: Function;
}
declare const ConnectToForm: (props: IConnectToForm) => ReactElement<any, string | import("react").JSXElementConstructor<any>> | null;
export default ConnectToForm;
