"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurrentUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const setCurrentUser = (req, res, next) => {
    var _a;
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.JWT)) {
        return next();
    }
    try {
        const currentUser = jsonwebtoken_1.default.verify(req.session.JWT, process.env.JWT_KEY);
        req.currentUser = currentUser;
    }
    catch (err) { }
    next();
};
exports.setCurrentUser = setCurrentUser;
