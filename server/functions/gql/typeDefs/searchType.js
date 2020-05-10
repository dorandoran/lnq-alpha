const { gql } = require('apollo-server-cloud-functions')

const Search = require('../../search/main')

const typeDef = gql`
  type Search {
    hits: [Hit]
  }
`

const resolvers = {
  // Global Query
  Query: {
    search: (parent, args, context, info) => {
      return Search.base(args)
    }
  },
  // Mutations
  Mutation: {},
  // Field Resolve
  Search: {},
  Hit: {
    __resolveType: (obj, context, info) => {
      if (obj.username) return 'User'
      if (obj.ownerId) return 'Event'
      return null
    }
  }
}

module.exports = { typeDef, resolvers }
