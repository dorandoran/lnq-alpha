import { IEvent } from '.'

export type ISocialLink = {
  id: string
  recipientId: string
  senderId: string
  message?: string
  answer: ESocialLinkAnswer
  updated_at: FirebaseFirestore.Timestamp
  created_at: FirebaseFirestore.Timestamp
  eventId?: string
}

export interface IInvite extends ISocialLink {
  eventId: string
  event: IEvent
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

export interface IInvitesAddToBatch extends IInvitesCreate {
  batch: FirebaseFirestore.WriteBatch
}

export enum ESocialLinkAnswer {
  REQUESTED = 'REQUESTED',
  ACCEPTED = 'ACCEPTED',
  MAYBE = 'MAYBE',
  DECLINED = 'DECLINED',
  INTERESTED = 'INTERESTED'
}
