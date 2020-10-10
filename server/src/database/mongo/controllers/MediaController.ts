import mongoose, { Document } from 'mongoose'
import { IMediaCreate } from '../interfaces'

const Media = mongoose.model('media')

interface IMediaController {
  create(mediaAttributes: IMediaCreate): Promise<Document | null>
  delete(id: string): Promise<boolean>
  findById(id: string): Promise<Document | null>
  findAllByLinkId(id: string, avatarId: string): Promise<Document[] | null>
}

export const MediaController: IMediaController = {
  create: async mediaAttributes => {
    const newMedia = {
      ...mediaAttributes,
      linkIds: mediaAttributes.linkId
        ? [mediaAttributes.linkId]
        : [mongoose.Types.ObjectId()] // Case when creating event avatar
    }

    try {
      return new Media(newMedia).save()
    } catch (e) {
      console.log(e)
      return null
    }
  },

  delete: async id => {
    try {
      const media = Media.findOneAndDelete({ id })
      if (media) return true
      return false
    } catch (e) {
      console.log(e)
      return false
    }
  },

  findById: async id => {
    try {
      const media = Media.findOne({ id })
      if (media) return media
      return null
    } catch (e) {
      console.log(e)
      return null
    }
  },

  findAllByLinkId: async (id, avatarId) => {
    try {
      const media = await Media.find({ linkIds: id })

      // Put avatar media first
      media.forEach((item, i) => {
        if (item.id === avatarId) {
          media.splice(i, 1)
          media.unshift(item)
        }
      })

      return media
    } catch (e) {
      console.log(e)
      return null
    }
  }
}
