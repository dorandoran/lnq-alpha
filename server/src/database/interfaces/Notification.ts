export interface INotificationCreate {
  ownerId: string
  senderId: string
  type: ENotificationType
}

export interface INotification {
  senderId: string
  type: ENotificationType
  viewed: boolean
  created_at: FirebaseFirestore.Timestamp
}

export enum ENotificationType {
  INVITE = 'INVITE',
  COHOST = 'COHOST',
  FOLLOW = 'FOLLOW',
  RSVP = 'RSVP',
  COMMENT = 'COMMENT'
}
