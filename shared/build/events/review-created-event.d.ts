import { Subjects } from "./subjects";
export interface ReviewCreatedEvent {
    subject: Subjects.ReviewCreated;
    data: {
        reviewContent: string;
        reviewRating: number;
        reviewAuthorId: string;
        reviewAuthorName: string;
        reviewAuthorProfilePicture: string;
        reviewedUserId: string;
    };
}
