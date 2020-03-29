import React, { createContext, useReducer } from 'react'

// Context
const State = createContext()
const Dispatch = createContext()

// Screens to disable tab bar
const disableTabBar = ['Create Main', 'Create Details']

const initialState = {
  name: 'Home',
  tabBar: true
}

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'changeRoute':
      return {
        ...state,
        name: action.payload,
        tabBar: disableTabBar.includes(action.payload)
      }
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

// Export
export const Route = {
  State,
  Dispatch,
  Provider
}
