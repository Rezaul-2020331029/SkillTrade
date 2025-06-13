import { Subjects } from "./subjects";
export interface ConnectionRequestedEvent {
    subject: Subjects.ConnectionRequested;
    data: {
        postId: string;
        postTitle: string;
        postAuthorId: string;
        requestedUserId: string;
        requestedUserName: string;
        requestedUserProfilePicture: string;
        toLearn: string[];
        toTeach: string[];
    };
}
