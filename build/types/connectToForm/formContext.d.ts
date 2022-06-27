/// <reference types="react" />
import { UseFormConfig } from "../useForm";
export declare const defaultValidate: ({ errors }: {
    errors?: {} | undefined;
}) => {};
declare const FormContext: import("react").Context<UseFormConfig>;
export declare const useFormContext: () => UseFormConfig;
export default FormContext;
