import React__default from 'react';
import { WebTarget } from '../utils/index.js';
import '../useForm/reducer.js';
import '../useReducer/index.js';

declare enum EnumFormSubmitStatus {
    Default = "default",
    Succeed = "succeed",
    Canceling = "canceling",
    Sending = "sending"
}
interface IFormSubmitProps<Target = WebTarget> {
    as?: Target;
    children?: (status: EnumFormSubmitStatus) => React__default.ReactNode;
    disableWhenErrors?: boolean;
    onSend: Function;
    onSucceed: (value: any) => any;
    onError?: (reason: any) => any;
    disabled?: boolean;
}
declare const FormSubmit: React__default.FC<IFormSubmitProps>;

export { EnumFormSubmitStatus, FormSubmit as default };
