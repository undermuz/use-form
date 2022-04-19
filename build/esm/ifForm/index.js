import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useIsFormCanceling, useIsFormHasErrors, useIsFormSending, useIsFormSuccess, } from "../utils";
const IfForm = (props) => {
    const { children, isCanceling = false, isSending = false, isSuccess = false, hasErrors, } = props;
    const isFormHasErrors = useIsFormHasErrors();
    const isFormSuccess = useIsFormSuccess();
    const isFormCanceling = useIsFormCanceling();
    const isFormSending = useIsFormSending();
    if ((hasErrors && !isFormHasErrors) ||
        (isSuccess && !isFormSuccess) ||
        (isCanceling && !isFormCanceling) ||
        (isSending && !isFormSending)) {
        return null;
    }
    return _jsx(_Fragment, { children: children });
};
export default IfForm;
