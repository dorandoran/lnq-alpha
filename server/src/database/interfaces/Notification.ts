export interface INotificationCreate {
  ownerId: string
  socialLinkId: string
  senderId?: string
  type: ENotificationType
}

export type INotification = {
  id: string
  senderId: string
  type: ENotificationType
  viewed: boolean
  created_at: FirebaseFirestore.Timestamp
  updated_at: FirebaseFirestore.Timestamp
  socialLinkId?: string
}

export interface ISocialLinkNotification extends INotification {
  socialLinkId: string
}

export enum ENotificationType {
  INVITE = 'Invite',
  COHOST = 'Cohost',
  FOLLOW = 'Follow',
  RSVP = 'RSVP',
  COMMENT = 'Comment',
  NEW_EVENT = 'NewEvent'
}

export enum ENotification {
  SOCIAL_LINK = 'SocialLinkNotification'
}
