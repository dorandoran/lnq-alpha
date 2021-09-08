import { gql } from 'apollo-server-express'
import {
  IUser,
  INotification,
  ISocialLinkNotification,
  ENotification
} from '../../database/interfaces'
import {
  InviteController,
  NotificationController
} from '../../database/controllers'

export const NotificationType = gql`
  interface Notification {
    id: String!
    senderId: String!
    type: String!
    viewed: Boolean
    created_at: Date
    updated_at: Date
  }

  type SocialLinkNotification implements Notification {
    id: String!
    senderId: String!
    type: String!
    viewed: Boolean
    created_at: Date
    updated_at: Date
    socialLinkId: String
    socialLink: SocialLink
  }
`

export const NotificationResolvers = {
  Query: {
    getUserNotifications: (
      parent: void,
      args: { id: string },
      context: { user: IUser }
    ) => {
      const id = args?.id || context.user.id
      return NotificationController.getAllByUserId(id)
    }
  },
  SocialLinkNotification: {
    socialLink: (parent: ISocialLinkNotification) => {
      return InviteController.findById(parent.socialLinkId)
    }
  },
  Notification: {
    __resolveType(obj: INotification) {
      if (obj.socialLinkId) {
        return ENotification.SOCIAL_LINK
      }
      return null // GraphQLError is thrown
    }
  },
  Subscription: {
    // notificationAdded: {
    //   subscribe: () =>
    //     pubsub.asyncIterator(ESubscriptionType.NOTIFICATION_ADDED)
    // }
  }
}
