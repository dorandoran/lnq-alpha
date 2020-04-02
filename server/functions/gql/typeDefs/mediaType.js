const { gql } = require('apollo-server-cloud-functions')

const Media = require('../../databases/store/media')

exports.typeDef = gql`
  type Media {
    id: String!
    uri: String!
  }
`

exports.resolvers = {
  Query: {
    media: (parent, args, context, info) => {
      return Media.findById(args)
    }
  },
  Mutation: {},
  Media: {}
}
