"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestValidationError = void 0;
const custom_error_1 = require("./custom-error");
class RequestValidationError extends custom_error_1.CustomError {
    constructor(errs) {
        super('Invalid request fields');
        this.errs = errs;
        this.statusCode = 400;
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errs.map((err) => {
            if (err.type === 'field')
                return { message: err.msg, field: err.path };
            return { message: err.msg };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
