import { IUser, IMedia, IAvatarInput, ILocation } from '.'

export interface ISearchEvent {
  query: string
  filters: string
  page: number
}

export interface ISearchUser {
  userId: string
  type?: ESearchUserType
  query?: string
  page?: number
  following?: string[]
  filters?: string[]
}

export interface ISearchHome {
  userId: string
  page: number
}

export interface ISearchLocate {
  userId: string
  page: number
}

export interface IUserHit {
  id: string
  username: string
  firstName: string
  lastName: string
  avatar?: {
    id: string
    uri: string
  }
  about: string
  isFollowing: boolean
}

export interface IEventHit {
  id: string
  ownerId: string
  owner: IUser
  avatar: IAvatarInput
  name: string
  type: string
  date: Date
  location: ILocation
  website: string
  description: string
  updated_at: Date
  created_at: Date
  media: IMedia[]
  likes: string[]
  numLikes: number
  plusOne: boolean
  isPrivate: boolean
}

export enum EBuckets {
  USERS = 'users',
  EVENTS = 'events'
}

export enum ESearchUserType {
  FOLLOW = 'follow'
}
