import React from 'react'
import useOverlay from '../components/hooks/useOverlay'

export interface ISearchContext {
  updateText: (text: string) => void
  updateCategories: (category: string) => void
  runSearch: () => void
  endSearch: () => void
  searchState: State
}

export enum SearchActions {
  UPDATE_TEXT = 'updateText',
  UPDATE_CATEGORIES = 'updateCategories',
  UPDATE_SEARCHING = 'updateSearching',
  UPDATE_LOCATION = 'updateLocation',
  UPDATE_DATE = 'updateDate'
}

type Action = {
  type: SearchActions
  payload?: any
}

const initialState = {
  text: '',
  categories: [] as string[],
  searching: false,
  location: '',
  date: ''
}

type State = {
  text: string
  categories: string[]
  searching: boolean
  location: string
  date: string
}

const reducer = (state: State, action: Action) => {
  const { type, payload } = action

  switch (type) {
    case SearchActions.UPDATE_TEXT:
      return { ...state, text: payload }
    case SearchActions.UPDATE_CATEGORIES:
      return { ...state, categories: payload }
    case SearchActions.UPDATE_LOCATION:
      return { ...state, location: action.payload }
    case SearchActions.UPDATE_DATE:
      return { ...state, date: action.payload }
    case SearchActions.UPDATE_SEARCHING:
      return { ...state, searching: payload }
    default:
      return state
  }
}

const SearchContext = React.createContext<ISearchContext | null>(null)

export const SearchProvider = (props: {
  children: React.ReactNode
}): JSX.Element => {
  const [searchState, dispatch] = React.useReducer(reducer, initialState)
  const { throwLoading, closeOverlay } = useOverlay()

  const updateText = (text: string) => {
    dispatch({ type: SearchActions.UPDATE_TEXT, payload: text })
  }

  const updateCategories = (category: string) => {
    const index = searchState.categories.indexOf(category)
    let categories = []

    if (index > -1) {
      categories = searchState.categories.filter(
        (_: any, idx: number) => index !== idx
      )
    } else {
      categories = [category]
    }
    dispatch({ type: SearchActions.UPDATE_CATEGORIES, payload: categories })
  }

  const runSearch = () => {
    throwLoading()
    dispatch({ type: SearchActions.UPDATE_SEARCHING, payload: true })
  }

  const endSearch = () => {
    closeOverlay()
    dispatch({ type: SearchActions.UPDATE_SEARCHING, payload: false })
  }

  return (
    <SearchContext.Provider
      value={{
        updateText,
        updateCategories,
        runSearch,
        endSearch,
        searchState
      }}
    >
      {props.children}
    </SearchContext.Provider>
  )
}

const useSearch = () => {
  const context = React.useContext(SearchContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider')
  }
  return context
}

export default useSearch
