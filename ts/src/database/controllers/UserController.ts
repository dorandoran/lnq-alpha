import mongoose, { Document } from 'mongoose'
const User = mongoose.model('users')

export interface ISaveUser {
  id: string
  firstName: string
  lastName: string
  email: string
}

interface IUpdateUser {
  id: string
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

interface UserControllerInterface {
  save(user: ISaveUser): Promise<Document | null>
  findById(id?: string): Promise<Document | null>
  update(updateUser: IUpdateUser): Promise<Document | null>
}

export const UserController: UserControllerInterface = {
  save: async user => {
    const newUser = {
      ...user,
      new: true,
      allowFollowers: true
    }

    try {
      const checkUser = await User.findOne({ id: newUser.id })
      if (checkUser) return null

      return new User(newUser).save()
    } catch (e) {
      console.log(e)
      return null
    }
  },

  findById: async id => {
    if (!id) return null

    try {
      const user = User.findOne({ id })
      if (user) return user

      return null
    } catch (e) {
      console.log(e)
      return null
    }
  },

  update: async updateUser => {
    const { id, ...updates } = updateUser

    try {
      const user = User.findOneAndUpdate({ id: updateUser.id }, updates, {
        new: true
      })
      if (user) return user

      return null
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
