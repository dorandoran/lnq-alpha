import mongoose, { Document } from 'mongoose'
import { IUserCreate, IUserUpdate } from '../interfaces'

const User = mongoose.model('users')

interface IUserController {
  create(userAttributes: IUserCreate): Promise<Document | null>
  update(userUpdate: IUserUpdate): Promise<Document | null>
  findById(id?: string): Promise<Document | null>
}

export const UserController: IUserController = {
  create: async userAttributes => {
    const newUser = {
      ...userAttributes,
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

  update: async userUpdate => {
    const { id, updates } = userUpdate

    try {
      const user = User.findOneAndUpdate({ id }, updates, {
        new: true
      })
      if (user) return user

      return null
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
  }
}
