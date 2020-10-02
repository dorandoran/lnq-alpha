export interface IUser {
  id: string
  username?: string
  firstName: string
  lastName: string
  email: string
  dob?: Date
  description?: String
  avatarUrl?: String
  website?: String
  new: Boolean
  categories?: string[]
  allowFollowers: Boolean
  created_at?: Date
}
