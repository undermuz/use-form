"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useFormSubmit = exports.useFormErrors = exports.useIsFormHasErrors = exports.useIsFormSending = exports.useIsFormCanceling = exports.useIsFormSuccess = exports.useReducer = exports.EnumFormStatus = exports.useFormContext = exports.ConnectToForm = exports.FormContext = exports.IfForm = void 0;
const tslib_1 = require("tslib");
const index_1 = tslib_1.__importDefault(require("./useForm/index"));
const index_2 = tslib_1.__importDefault(require("./useReducer/index"));
exports.useReducer = index_2.default;
const reducer_1 = require("./useForm/reducer");
Object.defineProperty(exports, "EnumFormStatus", { enumerable: true, get: function () { return reducer_1.EnumFormStatus; } });
const formContext_1 = tslib_1.__importStar(require("./connectToForm/formContext"));
exports.FormContext = formContext_1.default;
Object.defineProperty(exports, "useFormContext", { enumerable: true, get: function () { return formContext_1.useFormContext; } });
const index_3 = tslib_1.__importDefault(require("./connectToForm/index"));
exports.ConnectToForm = index_3.default;
const utils_1 = require("./utils");
Object.defineProperty(exports, "useIsFormSuccess", { enumerable: true, get: function () { return utils_1.useIsFormSuccess; } });
Object.defineProperty(exports, "useIsFormCanceling", { enumerable: true, get: function () { return utils_1.useIsFormCanceling; } });
Object.defineProperty(exports, "useIsFormSending", { enumerable: true, get: function () { return utils_1.useIsFormSending; } });
Object.defineProperty(exports, "useIsFormHasErrors", { enumerable: true, get: function () { return utils_1.useIsFormHasErrors; } });
Object.defineProperty(exports, "useFormErrors", { enumerable: true, get: function () { return utils_1.useFormErrors; } });
Object.defineProperty(exports, "useFormSubmit", { enumerable: true, get: function () { return utils_1.useFormSubmit; } });
const ifForm_1 = tslib_1.__importDefault(require("./ifForm"));
exports.IfForm = ifForm_1.default;
exports.default = index_1.default;
