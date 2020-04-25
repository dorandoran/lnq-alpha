import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const actions = {
  updateQuery: 'updateQuery',
  updateFilters: 'updateFilters',
  updateBucket: 'updateBucket'
}

const initialState = {
  query: '',
  filters: '',
  bucket: 'event'
}

function reducer (state, action) {
  switch (action.type) {
    case actions.updateQuery:
      return {
        ...state,
        query: action.payload
      }
    case actions.updateFilters:
      return {
        ...state,
        filters: action.payload
      }
    case actions.updateBucket:
      return {
        ...state,
        bucket: action.payload
      }
    default:
      // TODO: Error handling
      throw new Error()
  }
}

const SearchContext = createContext()

export const SearchProvider = ({ children }) => {
  const [searchState, dispatch] = useReducer(reducer, initialState)

  return (
    <SearchContext.Provider value={{ searchState, dispatch }}>
      {children}
    </SearchContext.Provider>
  )
}

SearchProvider.propTypes = {
  children: PropTypes.node
}

export default SearchContext
