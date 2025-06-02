"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseError = void 0;
const custom_error_1 = require("./custom-error");
class DatabaseError extends custom_error_1.CustomError {
    constructor() {
        super('Database connection error');
        this.statusCode = 500;
        this.reason = "Database isn't reachable";
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
    serializeErrors() {
        return [{ message: this.reason }];
    }
}
exports.DatabaseError = DatabaseError;
