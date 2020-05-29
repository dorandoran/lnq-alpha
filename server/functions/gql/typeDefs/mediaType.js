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
