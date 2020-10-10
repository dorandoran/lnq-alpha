import mongoose, { Document } from 'mongoose'
import { IEventCreate, IEventUpdate } from '../interfaces'

const Event = mongoose.model('events')

interface IEventController {
  create(eventAttributes: IEventCreate): Promise<Document | null>
  update(eventUpdate: IEventUpdate): Promise<Document | null>
  delete(id: string): Promise<boolean>
  findById(id: string): Promise<Document | null>
  findAllByOwnerId(id?: string): Promise<Document[] | null>
}

export const EventController: IEventController = {
  create: async eventAttributes => {
    const newEvent = {
      ...eventAttributes,
      likes: []
    }

    // TODO: Send Invites

    // TODO: Send Follows

    try {
      return new Event(newEvent).save()
    } catch (e) {
      console.log(e)
      return null
    }
  },

  update: async eventUpdate => {
    const { id, updates } = eventUpdate

    try {
      const event = Event.findOneAndUpdate({ id }, updates, { new: true })
      if (event) return event

      return null
    } catch (e) {
      console.log(e)
      return null
    }
  },

  delete: async id => {
    try {
      const event = Event.findOneAndDelete({ id })
      if (event) return true
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  },

  findById: async id => {
    try {
      const event = Event.findOne({ id })
      if (event) return event

      return null
    } catch (e) {
      console.log(e)
      return null
    }
  },

  findAllByOwnerId: async id => {
    if (!id) return null
    try {
      return Event.find({ ownerId: id })
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
