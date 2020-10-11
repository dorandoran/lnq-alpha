import { IUser, IEvent } from '../../database/interfaces'

export interface IAlgoliaUser extends IUser {
  objectID: string
  created_at_timestamp: number
  dob_timestamp?: number
}

export interface IAlgoliaEvent extends IEvent {
  objectID: string
  created_at_timestamp: number
  date_timestamp: number
  _tags: string[] // Algolia reserved word for category searching
}

export interface IUserAdditionalAttr {
  objectID: string
  created_at_timestamp: number
  created_at: Date
  dob_timestamp?: number
  dob?: Date
}
