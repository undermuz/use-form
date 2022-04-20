import { __extends } from "tslib";
var FormValidateError = /** @class */ (function (_super) {
    __extends(FormValidateError, _super);
    function FormValidateError(message, errors) {
        var _this = _super.call(this, message) || this;
        _this.name = "FormValidateError";
        _this.errors = errors;
        _this.message = message;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, FormValidateError.prototype);
        return _this;
    }
    return FormValidateError;
}(Error));
var FormSendError = /** @class */ (function (_super) {
    __extends(FormSendError, _super);
    function FormSendError(message, catchError, errors) {
        var _this = _super.call(this, message) || this;
        _this.name = "FormSendError";
        _this.catchError = catchError;
        _this.errors = errors;
        _this.message = message;
        // Set the prototype explicitly.
        Object.setPrototypeOf(_this, FormSendError.prototype);
        return _this;
    }
    return FormSendError;
}(Error));
export { FormValidateError, FormSendError };
