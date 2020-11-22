export interface IComment {
  id: string
  ownerId: string
  linkId: string
  text: string
  created_at: FirebaseFirestore.Timestamp
  updated_at: FirebaseFirestore.Timestamp
}

export interface IAddComment {
  eventId: string
  ownerId: string
  comment: string
}
