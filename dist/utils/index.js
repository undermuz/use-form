// src/utils/index.ts
import { useCallback, useEffect, useRef } from "react";
import { useFormContext } from "../connectToForm/formContext.js";
var useIsFormSuccess = () => {
  const params = useFormContext();
  return params.isSuccess;
};
var useIsFormCanceling = () => {
  const params = useFormContext();
  return params.isCanceling;
};
var useIsFormSending = () => {
  const params = useFormContext();
  return params.isSending;
};
var useIsFormHasErrors = () => {
  const params = useFormContext();
  return Object.keys(params.errors).length > 0;
};
var useFormFields = () => {
  const params = useFormContext();
  return params.fields;
};
var useFormErrors = () => {
  const params = useFormContext();
  return params.errors;
};
var useFormSubmit = (onSend, onSucceed, onError) => {
  const { send } = useFormContext();
  const handleSave = useCallback(() => {
    send(onSend).then(onSucceed, onError);
  }, [send, onSend, onSucceed, onError]);
  return handleSave;
};
var useRefBy = (by) => {
  const refBy = useRef(by);
  useEffect(() => {
    refBy.current = by;
  }, [by]);
  return refBy;
};
export {
  useFormErrors,
  useFormFields,
  useFormSubmit,
  useIsFormCanceling,
  useIsFormHasErrors,
  useIsFormSending,
  useIsFormSuccess,
  useRefBy
};
