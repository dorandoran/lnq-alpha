import React, { cloneElement } from 'react'
import { Route } from '@context/routeContext'

// Store
const providers = [<Route.Provider />]

const Store = ({ children: initial }) =>
  providers.reduce(
    (children, parent) => cloneElement(parent, { children }),
    initial
  )

export { Store, Route }
