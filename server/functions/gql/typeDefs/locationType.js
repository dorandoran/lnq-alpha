const { gql } = require('apollo-server-cloud-functions')

exports.typeDef = gql`
  type Location {
    latitude: Float!
    longitude: Float!
    text: String!
  }

  input LocationInput {
    latitude: Float!
    longitude: Float!
    text: String!
  }
`

exports.resolvers = {
  Query: {},
  Mutation: {},
  Location: {}
}
