import { Subjects } from "./subjects";
export interface ConnectionRejectedEvent {
    subject: Subjects.ConnectionRejected;
    data: {
        postId: string;
        postAuthorId: string;
        requestedUserId: string;
    };
}
