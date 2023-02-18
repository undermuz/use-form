import React__default from 'react';

interface IIfFormProps {
    children: React__default.ReactNode;
    hasErrors?: boolean;
    isCanceling?: boolean;
    isSending?: boolean;
    isSuccess?: boolean;
}
declare const IfForm: React__default.FC<IIfFormProps>;

export { IIfFormProps, IfForm as default };
