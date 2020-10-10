import mongoose, { Document } from 'mongoose'
import { IInvitesCreate } from '../interfaces'

const Invite = mongoose.model('invites')

interface IInviteController {
  saveAll(invitesAttributes: IInvitesCreate): Promise<Document[] | null>
  findAllByEventId(id: string): Promise<Document[] | null>
  findAllByRecipientId(id: string): Promise<Document[] | null>
}

export const InviteController: IInviteController = {
  saveAll: async ({ senderId, recipientIds, eventId }) => {
    const newInvites = recipientIds.map(recipientId => {
      return {
        recipientId,
        senderId,
        eventId,
        answer: 'REQUESTED'
      }
    })

    // TODO: Create notifications

    try {
      return Invite.insertMany(newInvites, { ordered: false })
    } catch (e) {
      console.log(e)
      return null
    }
  },

  findAllByEventId: async id => {
    try {
      return Invite.find({ eventId: id })
    } catch (e) {
      console.log(e)
      return null
    }
  },

  findAllByRecipientId: async id => {
    try {
      return Invite.find({ recipientId: id })
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
