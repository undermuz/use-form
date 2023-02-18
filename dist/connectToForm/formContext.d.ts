import * as React from 'react';
import { UseFormConfig } from '../useForm/index.js';
import '../useForm/reducer.js';
import '../useReducer/index.js';

declare const defaultValidate: ({ errors }: {
    errors?: {} | undefined;
}) => {};
declare const FormContext: React.Context<UseFormConfig>;
declare const useFormContext: () => UseFormConfig;

export { FormContext as default, defaultValidate, useFormContext };
