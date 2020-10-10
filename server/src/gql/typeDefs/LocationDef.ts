import { gql } from 'apollo-server-express'

export const LocationType = gql`
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

export const LocationResolvers = {
  Query: {},
  Mutation: {},
  Location: {}
}
