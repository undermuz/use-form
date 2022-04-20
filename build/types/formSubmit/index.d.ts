import React from "react";
import { WebTarget } from "../utils";
export declare enum EnumFormSubmitStatus {
    Default = "default",
    Succeed = "succeed",
    Canceling = "canceling",
    Sending = "sending"
}
interface IFormSubmitProps<Target = WebTarget> {
    as?: Target;
    children?: (status: EnumFormSubmitStatus) => React.ReactNode;
    disableWhenErrors?: boolean;
    onSend: Function;
    onSucceed: (value: any) => any;
    onError?: (reason: any) => PromiseLike<never>;
    disabled?: boolean;
}
declare const FormSubmit: React.FC<IFormSubmitProps>;
export default FormSubmit;
