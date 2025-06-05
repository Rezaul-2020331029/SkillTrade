"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotAuthorizeError = void 0;
const custom_error_1 = require("./custom-error");
class NotAuthorizeError extends custom_error_1.CustomError {
    constructor() {
        super("Not Authorized");
        this.statusCode = 403;
        Object.setPrototypeOf(this, NotAuthorizeError.prototype);
    }
    serializeErrors() {
        return [{ message: "Not authorized" }];
    }
}
exports.NotAuthorizeError = NotAuthorizeError;
