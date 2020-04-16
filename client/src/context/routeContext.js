import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

// Context
const State = createContext()
const Dispatch = createContext()

// Screens to disable tab bar
const disableTabBar = ['Create']

/* 
  name: name of current screen
  tabBar: whether or not to show tab bar on screen
  selected: pass object containing the <id> and <type> to show in modal
            use EVENT_CONST or USER_CONST from @util/constants for type.
            Example: { id: '[this is an id]', type: 'event' }
*/
const initialState = {
  name: 'Home',
  tabBar: true,
  selected: null
}

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'changeRoute':
      return {
        ...state,
        name: action.payload,
        tabBar: !disableTabBar.includes(action.payload)
      }
    case 'openModal':
      return { ...state, selected: action.payload }
    case 'closeModal':
      return { ...state, selected: null }
    default:
      return state
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
