import mongoose, { Document } from 'mongoose'
import { IFollowRequest } from '../interfaces'

const Follow = mongoose.model('follows')

interface IFollowController {
  saveAll(followAttributes: IFollowRequest): Promise<Document[] | null>
  findAllByRecipientId(id: String): Promise<Document[] | null>
  findAllBySenderId(id: String): Promise<Document[] | null>
}

export const FollowController: IFollowController = {
  saveAll: async ({ senderId, recipientIds }) => {
    const newFollows = recipientIds.map(recipientId => {
      return {
        senderId,
        recipientId,
        answer: 'REQUESTED'
      }
    })

    // TODO: Insert notifications

    try {
      return Follow.insertMany(newFollows, { ordered: false })
    } catch (e) {
      console.log(e)
      return null
    }
  },

  findAllByRecipientId: async id => {
    try {
      return Follow.find({ recipientId: id })
    } catch (e) {
      console.log(e)
      return null
    }
  },

  findAllBySenderId: async id => {
    try {
      return Follow.find({ recipientId: id })
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
