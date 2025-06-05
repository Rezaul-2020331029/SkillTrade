import { CustomError } from './custom-error';
import { ValidationError } from 'express-validator';
export declare class RequestValidationError extends CustomError {
    errs: ValidationError[];
    statusCode: number;
    constructor(errs: ValidationError[]);
    serializeErrors(): ({
        message: any;
        field: string;
    } | {
        message: any;
        field?: undefined;
    })[];
}
