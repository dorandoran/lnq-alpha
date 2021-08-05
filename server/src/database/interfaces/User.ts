import { IAvatar, IAvatarInput, IFile } from '.'

export interface IUser {
  id: string
  username?: string
  firstName: string
  lastName: string
  email: string
  dob?: Date
  about?: string
  avatar?: IAvatar
  bannerAvatar?: IAvatar
  website?: string
  new: boolean
  categories?: string[]
  allowFollowers: boolean
  bookmarkEvents?: string[]
  created_at?: FirebaseFirestore.Timestamp | Date
}

export interface IUserCreate {
  id: string
  firstName: string
  lastName: string
  email: string
}

export interface IUserUpdate {
  username?: string
  firstName?: string
  lastName?: string
  dob?: Date
  about?: string
  avatar?: IAvatarInput
  bannerAvatar?: IAvatarInput
  website?: string
  new?: Boolean
  categories?: string[]
  allowFollowers?: Boolean
  bookmarkEvents?: string[] | FirebaseFirestore.FieldValue
}

export interface IUserUpdateInput {
  id: string
  updates: {
    username?: string
    firstName?: string
    lastName?: string
    dob?: Date
    about?: string
    avatar?: Promise<IFile> | IAvatar
    bannerAvatar?: Promise<IFile> | IAvatar
    website?: string
    new?: Boolean
    categories?: string[]
    allowFollowers?: Boolean
    addBookmarkEvents?: string[]
    removeBookmarkEvents?: string[]
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

export interface IAddBookmarkEvent {
  userId?: string
  eventId: string
}
