import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const actions = {
  updateQuery: 'updateQuery',
  updateCategories: 'updateCategories'
}

const initialState = {
  query: '',
  categories: [],
  page: 0
}

function reducer(state, action) {
  switch (action.type) {
    case actions.updateQuery:
      return {
        ...state,
        query: action.payload
      }
    case actions.updateCategories: {
      // TODO: Multiple Category Searching
      const index = state.categories.indexOf(action.payload)
      let categories = []

      if (index > -1) {
        categories = state.categories.filter((_, idx) => index !== idx)
      } else {
        categories = [action.payload]
      }

      return {
        ...state,
        categories
      }
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

const useSearch = () => {
  const context = useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

SearchProvider.propTypes = {
  children: PropTypes.node
}

export default useSearch
