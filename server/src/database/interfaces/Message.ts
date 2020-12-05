export interface IMessage {
  id: string
  ownerId: string
  text: string
  created_at: FirebaseFirestore.Timestamp
  linkIds: string[]
  viewed?: boolean
}

export interface IComment extends IMessage {}

export interface IAddComment {
  eventId: string
  ownerId: string
  comment: string
}

export interface ICreateMessage {
  conversationId: string
  senderId: string
  recipientIds: string[]
  text: string
}
