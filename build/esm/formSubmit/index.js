import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import IfForm from "../ifForm";
import { useFormSubmit, useIsFormHasErrors, useIsFormSending, } from "../utils";
export var EnumFormSubmitStatus;
(function (EnumFormSubmitStatus) {
    EnumFormSubmitStatus["Default"] = "default";
    EnumFormSubmitStatus["Succeed"] = "succeed";
    EnumFormSubmitStatus["Canceling"] = "canceling";
    EnumFormSubmitStatus["Sending"] = "sending";
})(EnumFormSubmitStatus || (EnumFormSubmitStatus = {}));
const FormSubmit = (props) => {
    const { as: Component = "button", children, disableWhenErrors = false, onSend, onSucceed, onError, disabled = false, ...otherProps } = props;
    const hasErrors = useIsFormHasErrors();
    const isSending = useIsFormSending();
    const submit = useFormSubmit(onSend, onSucceed, onError);
    return (_jsxs(Component, { ...otherProps, disabled: isSending || (hasErrors && disableWhenErrors) || disabled, type: "submit", onClick: submit, children: [_jsx(IfForm, { children: children ? children(EnumFormSubmitStatus.Default) : "Send" }), _jsx(IfForm, { isSuccess: true, children: children ? children(EnumFormSubmitStatus.Succeed) : "Succeed" }), _jsx(IfForm, { isCanceling: true, children: children ? children(EnumFormSubmitStatus.Canceling) : "Failed" }), _jsx(IfForm, { isSending: true, children: children
                    ? children(EnumFormSubmitStatus.Sending)
                    : "Sending..." })] }));
};
export default FormSubmit;
