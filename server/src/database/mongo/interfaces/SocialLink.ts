export interface ISocialLink {
  id: string
  recipientId: string
  senderId: string
  eventId?: string
  message?: string
  answer: boolean
  updated_at: Date
  created_at: Date
}

export interface IInvitesCreate {
  eventId: string
  senderId: string
  recipientIds: string[]
}

export interface IFollowRequest {
  senderId: string
  recipientIds: string[]
}
