import { IAvatar, IAvatarInput, IFile } from '.'

export interface IUser {
  id: string
  username?: string
  firstName: string
  lastName: string
  email: string
  dob?: Date
  description?: string
  avatar?: IAvatar
  website?: string
  new: boolean
  categories?: string[]
  allowFollowers: boolean
  created_at?: FirebaseFirestore.Timestamp | Date
}

export interface IUserCreate {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface IUserUpdate {
  id: string
  updates: {
    username?: string
    firstName?: string
    lastName?: string
    dob?: Date
    description?: string
    avatar?: IAvatarInput
    website?: string
    new?: Boolean
    categories?: string[]
    allowFollowers?: Boolean
  }
}

export interface INewUserUpdate {
  id: string
  username: string
  dob: Date
  website: string
}

export interface IUserUpdateAvatar {
  id: string
  image: Promise<IFile>
}

export interface INewUserUpdateResponse {
  response: string
  user: FirebaseFirestore.DocumentData | null
}
