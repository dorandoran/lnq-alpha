import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

export const actions = {
  updateRoute: 'updateRoute',
  openModal: 'openModal',
  closeModal: 'closeModal',
  toggleFab: 'toggleTabBarFab',
  closeFab: 'closeTabBarFab'
}

const initialState = {
  name: 'Home',
  tabBar: {
    show: true,
    fabButton: false
  },
  selected: null
}

// Screens to disable tab bar
const disableTabBar = ['Create']

// Context
const State = createContext()
const Dispatch = createContext()

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case actions.updateRoute:
      return {
        ...state,
        name: action.payload,
        tabBar: {
          show: !disableTabBar.includes(action.payload),
          fabButton: false
        }
      }
    case actions.openModal:
      return { ...state, selected: action.payload }
    case actions.closeModal:
      return { ...state, selected: null }
    case actions.toggleFab:
      return {
        ...state,
        tabBar: { ...state.tabBar, fabButton: !state.tabBar.fabButton }
      }
    case actions.closeFab:
      return {
        ...state,
        tabBar: { ...state.tabBar, fabButton: false }
      }
    default:
      throw new Error('Something happened with the route context!')
  }
}

// Provider
const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <State.Provider value={state}>
      <Dispatch.Provider value={dispatch}>{children}</Dispatch.Provider>
    </State.Provider>
  )
}

Provider.propTypes = {
  children: PropTypes.node
}

// Export
export const Route = {
  State,
  Dispatch,
  Provider
}
