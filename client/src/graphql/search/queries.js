import { gql } from '@apollo/client'

export const HomeSearch = gql`
  query HomeSearch($page: Int) {
    homeSearch(page: $page) {
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
      tier
    }
  }
`

export const EventSearch = gql`
  query EventSearch($query: String, $filters: String, $page: Int) {
    eventSearch(query: $query, filters: $filters, page: $page) {
      id
      name
      avatar {
        id
        uri
      }
      owner {
        id
        username
        avatar {
          id
          uri
        }
      }
      location {
        id
        text
      }
      date
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


export const LocateSearch = gql`
  query LocateSearch($page: Int) {
    locateSearch(page: $page) {
      id
      name
      avatar {
        id
        uri
      }
      owner {
        id
        username
        avatar {
          id
          uri
        }
      }
      location {
        id
        latitude
        longitude
      }
      date
    }
  }
`