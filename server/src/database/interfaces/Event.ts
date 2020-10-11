import { ILocation, IAvatarInput } from '.'

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

export interface IEventCreate {
  id: string
  ownerId: string
  userId: string
  avatar: IAvatarInput
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
    avatar?: IAvatarInput
    type?: string
    date?: Date
    location?: ILocation
    website?: string
    description?: string
    plusOne?: boolean
    isPrivate?: boolean
  }
}
