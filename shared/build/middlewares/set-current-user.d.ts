import { Request, Response, NextFunction } from "express";
interface decodedUser {
    email: string;
    id: string;
    profilePicture: string;
    fullName: string;
    isPremium: boolean;
}
declare global {
    namespace Express {
        interface Request {
            currentUser: decodedUser;
        }
    }
}
export declare const setCurrentUser: (req: Request, res: Response, next: NextFunction) => void;
export {};
