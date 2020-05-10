import { gql } from 'apollo-boost'
import { searchEventFragment } from '@graphql/event/fragments'

export const Search = gql`
  ${searchEventFragment}

  query Search($bucket: String!, $query: String, $filters: String, $page: Int) {
    search(bucket: $bucket, query: $query, filters: $filters, page: $page) {
      ... on Event {
        ...searchEventFields
      }
    }
  }
`
