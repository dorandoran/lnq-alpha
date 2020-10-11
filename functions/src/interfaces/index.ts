export interface IMediaFindByLinkId {
  id: string
  avatarId?: string
}

export interface IMediaDelete {
  id: string
  linkId: string
  bucket: string
  force?: boolean
}

export interface IStorageResponse {
  completed: boolean
  error: string
}

export interface IUser {
  id: string
  username?: string
  firstName: string
  lastName: string
  email: string
  dob?: Date
  description?: string
  avatarUrl?: string
  website?: string
  new: boolean
  categories?: string[]
  allowFollowers: boolean
  created_at?: FirebaseFirestore.Timestamp | Date
}

export interface IEvent {
  id: string
  ownerId: string
  avatar: IAvatarInput
  name: string
  type: string
  date: Date
  location: ILocation
  website?: string
  description?: string
  updated_at: FirebaseFirestore.Timestamp
  created_at: FirebaseFirestore.Timestamp
  likes: string[]
  numLikes: number
  plusOne: boolean
  isPrivate: boolean
}

export interface IFollow extends FirebaseFirestore.DocumentData {
  id: string
  answer: string
  recipientId: string
  senderId: string
  updated_at: FirebaseFirestore.Timestamp
  created_at: FirebaseFirestore.Timestamp
}

export interface ILocation {
  latitude: number
  longitude: number
  text: string
}

export interface IAvatarInput {
  id: string
  uri: string
}

export interface IAlgoliaUser extends IUser {
  objectID: string
  created_at_timestamp: number
  dob_timestamp?: number
}

export interface IAlgoliaEvent extends IEvent {
  objectID: string
  created_at_timestamp: number
  date_timestamp: number
  _tags: string[] // Algolia reserved word for category searching
}

export interface IUserAdditionalAttr {
  objectID: string
  created_at_timestamp: number
  created_at: Date
  dob_timestamp?: number
  dob?: Date
}

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

export enum EBuckets {
  USERS = 'users',
  EVENTS = 'events'
}

export enum ENotificationType {
  INVITE = 'INVITE',
  COHOST = 'COHOST',
  FOLLOW = 'FOLLOW',
  RSVP = 'RSVP',
  COMMENT = 'COMMENT'
}
