"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const custom_error_1 = require("../errors/custom-error");
const errorHandler = (err, req, res, next) => {
    if (err instanceof custom_error_1.CustomError) {
        res.status(err.statusCode).send({ errors: err.serializeErrors() });
    }
    else {
        console.log('###################');
        console.log(err.name);
        console.log(err.message);
        console.log('###################');
        console.log(err.stack);
        console.log('###################');
        res.status(500).send({
            errors: [{ message: 'Something went wrong', field: err.stack }],
        });
    }
};
exports.errorHandler = errorHandler;
