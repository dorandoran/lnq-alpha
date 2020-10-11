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
      created_at_timestamp: data.created_at.seconds, // Turn firebase Timestamp to seconds
      created_at: data.created_at.toDate() // Turn firebase Timestamp to Date
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
      created_at_timestamp: data.created_at.seconds,
      created_at: data.created_at.toDate(),
      date_timestamp: data.date.seconds,
      date: data.date.toDate(),
      _tags: [data.type] // Algolia reserved word for category searching
    }

    return Object.assign(data, additionalAttr)
  }
}

export default IndexFactory
