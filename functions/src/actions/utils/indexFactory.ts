import { timestamp } from '../../services/firebase'
import {
  IAlgoliaUser,
  IAlgoliaEvent,
  IUserAdditionalAttr
} from '../../interfaces'

interface IIndexFactory {
  user(data: any): IAlgoliaUser
  event(data: any): IAlgoliaEvent
}

const IndexFactory: IIndexFactory = {
  user(data: any): IAlgoliaUser {
    const additionalAttr: IUserAdditionalAttr = {
      objectID: data.id, // Algolia search id key
      created_at_timestamp: data.created_at
        ? data.created_at.seconds
        : timestamp.now().seconds, // Turn firebase Timestamp to seconds
      created_at: data.created_at
        ? data.created_at.toDate()
        : timestamp.now().toDate(), // Turn firebase Timestamp to Date
      _tags: [data.id]
    }

    if (data.dob) {
      additionalAttr.dob_timestamp = data.dob.seconds
      additionalAttr.dob = data.dob.toDate()
    }

    return Object.assign(data, additionalAttr)
  },

  event(data: any): IAlgoliaEvent {
    const additionalAttr = {
      objectID: data.id, // Algolia search id key
      created_at_timestamp: data.created_at
        ? data.created_at.seconds
        : timestamp.now().seconds,
      created_at: data.created_at
        ? data.created_at.toDate()
        : timestamp.now().toDate(),
      date_timestamp: data.date ? data.date.seconds : timestamp.now().seconds,
      date: data.date ? data.date.toDate() : timestamp.now().toDate(),
      _geoloc: {
        lat: data.location ? data.location.latitude : null,
        lng: data.location ? data.location.longitude : null
      },
      _tags: [data.type] // Algolia reserved word for category searching
    }

    return Object.assign(data, additionalAttr)
  }
}

export default IndexFactory
