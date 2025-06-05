import { Subjects } from "./subjects"

export interface ConnectionAcceptedEvent {
  subject: Subjects.ConnectionAccepted
  data: {
    postId: string
    postAuthorId: string
    requestedUserId: string
  }
}
