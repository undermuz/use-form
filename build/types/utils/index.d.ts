/// <reference types="react" />
interface ExoticComponentWithDisplayName<P = unknown> extends React.ExoticComponent<P> {
    defaultProps?: Partial<P>;
    displayName?: string;
}
declare type AnyComponent<P = any> = ExoticComponentWithDisplayName<P> | React.ComponentType<P>;
declare type KnownWebTarget = keyof JSX.IntrinsicElements | AnyComponent;
export declare type WebTarget = string | KnownWebTarget;
export declare const useIsFormSuccess: () => boolean;
export declare const useIsFormCanceling: () => boolean;
export declare const useIsFormSending: () => boolean;
export declare const useIsFormHasErrors: () => boolean;
export declare const useFormFields: () => import("..").IFields;
export declare const useFormErrors: () => import("../useForm/reducer").IErrors;
export declare const useFormSubmit: (onSend: Function, onSucceed: (value: any) => any, onError?: ((reason: any) => PromiseLike<never>) | undefined) => () => void;
export {};
