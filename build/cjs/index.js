"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useReducer = exports.EnumFormStatus = exports.useFormContext = exports.ConnectToForm = exports.FormContext = void 0;
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
exports.default = index_1.default;
