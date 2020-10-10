import { ILocation } from '.'

export interface IEvent {
  id: string
  ownerId: string
  avatarId: string
  name: string
  type: string
  date: Date
  location: ILocation
  website?: string
  description?: string
  created_at: Date
  likes: string[]
  plusOne: boolean
  isPrivate: boolean
}

export interface IEventCreate {
  id: string
  ownerId: string
  userId: string
  avatarId: string
  name: string
  type: string
  date: Date
  location: ILocation
  website?: string
  description?: string
  plusOne: boolean
  likes: string[]
  isPrivate: boolean
  recipientIds: string[]
  followIds: string[]
}

export interface IEventUpdate {
  id: string
  updates: {
    name?: string
    avatarId?: string
    type?: string
    date?: Date
    location?: ILocation
    website?: string
    description?: string
    plusOne?: boolean
    isPrivate?: boolean
  }
}
