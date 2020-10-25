import { gql } from '@apollo/client'

export const Search = gql`
  query Search($query: String, $filters: String, $page: Int) {
    eventSearch(query: $query, filters: $filters, page: $page) {
      id
      name
      avatar {
        id
        uri
      }
      owner {
        id
        avatar {
          id
          uri
        }
      }
      location {
        id
        text
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
