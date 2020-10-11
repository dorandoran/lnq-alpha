import { IUser, IMedia, IAvatarInput, ILocation } from '.'

export interface ISearchBase {
  bucket: EBuckets
  query: string
  filters: string
  page: number
}

export interface ISearchUser {
  userId: string
  query: string
  page: number
  following: string[]
}

export interface IUserHit {
  id: string
  username: string
  firstName: string
  lastName: string
  avatarUrl: string
  description: string
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
