import { Subjects } from "./subjects"

export interface ConnectionCancelledEvent {
  subject: Subjects.ConnectionCancelled
  data: {
    postId: string
    postAuthorId: string
    requestedUserId: string
  }
}
