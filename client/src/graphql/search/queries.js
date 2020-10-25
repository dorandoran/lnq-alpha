import { gql } from '@apollo/client'
import { searchEventFragment } from '@graphql/event/fragments'

export const Search = gql`
  ${searchEventFragment}

  query Search($query: String, $filters: String, $page: Int) {
    eventSearch(query: $query, filters: $filters, page: $page) {
      ... on Event {
        ...searchEventFields
      }
    }
  }
`

export const UserSearch = gql`
  query UserSearch($query: String, $page: Int, $following: [String]) {
    userSearch(query: $query, page: $page, following: $following) {
      id
      firstName
      lastName
      username
      avatar {
        id
        uri
      }
      isFollowing
    }
  }
`
