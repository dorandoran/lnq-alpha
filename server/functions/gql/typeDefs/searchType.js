const { gql } = require('apollo-server-cloud-functions')

const Search = require('../../search/main')

const typeDef = gql`
  type Search {
    hits: [Hit]
  }

  type UserHit {
    id: String!
    username: String
    firstName: String!
    lastName: String!
    avatarUrl: String
    description: String
    isFollowing: Boolean
  }
`

const resolvers = {
  // Global Query
  Query: {
    search: (parent, args, context, info) => {
      return Search.base(args)
    },
    userSearch: (parent, args, context, info) => {
      args.userId = context.user.id
      return Search.user(args)
    }
  },
  // Mutations
  Mutation: {},
  // Field Resolve
  Search: {},
  Hit: {
    __resolveType: (obj, context, info) => {
      if (obj.firstName) return 'UserHit'
      if (obj.ownerId) return 'Event'
      return null
    }
  }
}

module.exports = { typeDef, resolvers }
