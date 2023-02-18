import { IFields, IErrors } from '../useForm/reducer.js';
import { MutableRefObject } from 'react';
import '../useReducer/index.js';

interface ExoticComponentWithDisplayName<P = unknown> extends React.ExoticComponent<P> {
    defaultProps?: Partial<P>;
    displayName?: string;
}
declare type AnyComponent<P = any> = ExoticComponentWithDisplayName<P> | React.ComponentType<P>;
declare type KnownWebTarget = keyof JSX.IntrinsicElements | AnyComponent;
declare type WebTarget = string | KnownWebTarget;
declare const useIsFormSuccess: () => boolean;
declare const useIsFormCanceling: () => boolean;
declare const useIsFormSending: () => boolean;
declare const useIsFormHasErrors: () => boolean;
declare const useFormFields: () => IFields;
declare const useFormErrors: () => IErrors;
declare const useFormSubmit: (onSend: Function, onSucceed: (value: any) => any, onError?: ((reason: any) => any) | undefined) => () => void;
declare const useRefBy: <T = any>(by: T) => MutableRefObject<T>;

export { WebTarget, useFormErrors, useFormFields, useFormSubmit, useIsFormCanceling, useIsFormHasErrors, useIsFormSending, useIsFormSuccess, useRefBy };
