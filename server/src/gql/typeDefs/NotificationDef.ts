import { gql } from 'apollo-server-express'
import { pubsub } from '../server'
import { ESubscriptionType } from '../../database/interfaces'

export const NotificationType = gql`
  type Notification {
    id: String!
    senderId: String!
    type: String
    viewed: Boolean
    created_at: Date
  }
`

export const NotificationResolvers = {
  Subscription: {
    notificationAdded: {
      subscribe: () =>
        pubsub.asyncIterator(ESubscriptionType.NOTIFICATION_ADDED)
    }
  }
}
