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
  created_at?: FirebaseFirestore.Timestamp
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
    avatarUrl?: string
    website?: string
    new?: Boolean
    categories?: string[]
    allowFollowers?: Boolean
  }
}
