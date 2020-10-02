const { gql } = require('apollo-server-express')

const Media = require('../../databases/models/media')

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
    media: (_, args) => {
      return Media.findById(args)
    }
  },
  Mutation: {
    createMedia: (_, args) => {
      return Media.saveToStore(args)
    },
    deleteMedia: (_, args) => {
      return Media.deleteFromStore(args)
    }
  },
  Media: {}
}
