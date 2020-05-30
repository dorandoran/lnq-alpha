import { gql } from 'apollo-boost'
import { searchEventFragment } from '@graphql/event/fragments'
import { userFragment } from '@graphql/user/fragments'

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

export const NewUserSearch = gql`
  ${userFragment}

  query NewUserSearch($query: String, $filters: String) {
    search(bucket: "users", query: $query, filters: $filters, page: 0) {
      ... on User {
        ...userFields
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
      avatarUrl
      isFollowing
    }
  }
`
