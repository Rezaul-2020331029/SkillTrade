import { CustomError } from "./custom-error";
export declare class NotAuthorizeError extends CustomError {
    statusCode: number;
    constructor();
    serializeErrors(): {
        message: string;
    }[];
}
