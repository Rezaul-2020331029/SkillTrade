import { CustomError } from './custom-error';
export declare class DatabaseError extends CustomError {
    statusCode: number;
    reason: string;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
