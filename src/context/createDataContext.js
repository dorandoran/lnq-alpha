import React, { useReducer } from 'react'

export default (reducer, actions, defaultValue) => {
  const Context = React.createContext()

  // eslint-disable-next-line react/prop-types
  const Provider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, defaultValue)

    const boundActions = {}
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch)
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    )
  }

  return { Context, Provider }
}