export interface IMediaFindByLinkId {
  id: string
  avatarId?: string
}

export interface IMediaRemove {
  id: string
  linkId: string
  bucket: EBuckets
  force?: boolean
}

export interface IMediaRemoveFromStorage {
  id: string
  bucket: EBuckets
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
  about?: string
  avatar?: {
    id: string
    uri: string
  }
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
  _tags: string[]
}

export interface INotificationCreate {
  ownerId: string
  senderId: string
  type: ENotificationType
}

export interface INotification {
  id: string
  senderId: string
  type: ENotificationType
  viewed: boolean
  created_at: FirebaseFirestore.Timestamp
}

export interface IGeneralRequestParams {
  [ESearchParameters.KEYWORD]: string[]
  [ESearchParameters.CITY]?: string
  [ESearchParameters.STATE]?: string
  [ESearchParameters.ZIP]?: string
  date?: string
  startDate?: string
  endDate?: string
}

export interface IWebSearchResponse {
  data: any
  status: number
}

export interface ISearchEvent {
  name: string
  url: string
  date: string
  img: string
}

export interface ISearchStream {
  name: string
  streamName: string
  url: string
  img: string
}

export interface ITwitchGqlResponse {
  id: string
  displayName: string
  broadcastSettings: {
    id: string
    title: string
  }
  profileImageURL: string
}

export interface ITicketMasterGqlResponse {
  id: string
  name: string
  url: string
  dates: {
    start: {
      dateTime: string
    }
  }
  imagesFiltered: Array<{ id: string; url: string }>
}

export enum EBuckets {
  USERS = 'users',
  EVENTS = 'events'
}

export enum ESearchTypes {
  TICKET_MASTER = 'ticketmaster',
  EVENTBRITE = 'eventbrite',
  TWITCH = 'twitch'
}

export enum ENotificationType {
  INVITE = 'INVITE',
  COHOST = 'COHOST',
  FOLLOW = 'FOLLOW',
  RSVP = 'RSVP',
  COMMENT = 'COMMENT'
}

export enum ESearchParameters {
  STATE = 'state',
  ZIP = 'zip',
  CITY = 'city',
  KEYWORD = 'keyword'
}

export enum ERequestTypes {
  GQL = 'GQL',
  REST = 'REST'
}
