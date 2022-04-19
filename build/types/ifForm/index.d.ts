import React from "react";
export interface IIfFormProps {
    children: React.ReactNode;
    hasErrors?: boolean;
    isCanceling?: boolean;
    isSending?: boolean;
    isSuccess?: boolean;
}
declare const IfForm: React.FC<IIfFormProps>;
export default IfForm;
