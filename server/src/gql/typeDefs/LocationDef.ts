import { gql } from 'apollo-server-express'

export const LocationType = gql`
  type Location {
    id: String!
    latitude: Float!
    longitude: Float!
    text: String!
  }

  input LocationInput {
    id: String!
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
