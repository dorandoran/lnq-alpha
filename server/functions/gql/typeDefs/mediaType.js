const { gql } = require('apollo-server-cloud-functions')

const Media = require('../../databases/store/media')

exports.typeDef = gql`
  type Media {
    id: String!
    userId: String!
    linkId: [String]!
    uri: String!
    created_at: Date!
  }
`

exports.resolvers = {
  Query: {
    media: (parent, args, context, info) => {
      return Media.findById(args)
    }
  },
  Mutation: {
    createMedia: (parent, args) => {
      return Media.saveToStore(args)
    },
    deleteMedia: (parent, args) => {
      return Media.deleteFromStore(args)
    }
  },
  Media: {}
}
