import { ReactNode } from 'react';

interface IIfFormProps {
    children: ReactNode;
    hasErrors?: boolean;
    isCanceling?: boolean;
    isSending?: boolean;
    isSuccess?: boolean;
}
declare const IfForm: React.FC<IIfFormProps>;

export { IIfFormProps, IfForm as default };
