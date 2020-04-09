import React, { createContext, useReducer } from 'react'
import PropTypes from 'prop-types'

// Context
const State = createContext()
const Dispatch = createContext()

// Screens to disable tab bar
const disableTabBar = ['Create']

const initialState = {
  name: 'Home',
  tabBar: true,
  modal: false,
  objectId: null
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
      return { ...state, modal: true, objectId: action.payload }
    case 'closeModal':
      return { ...state, modal: false, objectId: null }
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
