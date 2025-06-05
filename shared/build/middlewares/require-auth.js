"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = void 0;
const not_authenticated_error_1 = require("../errors/not-authenticated-error");
const requireAuth = (req, res, next) => {
    if (!req.currentUser)
        throw new not_authenticated_error_1.NotAuthenticatedError();
    next();
};
exports.requireAuth = requireAuth;
