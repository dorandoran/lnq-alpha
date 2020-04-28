import { useContext } from 'react'
import { Route } from '@context/routeStore'
import { actions } from '@context/routeContext'

export const useRouteDispatch = () => {
  const context = useContext(Route.Dispatch)
  if (context === undefined) {
    throw new Error('useRouteDispatch must be used within a RouteProvider')
  }
  return { dispatch: context, actions }
}

export const useRouteState = () => {
  const context = useContext(Route.State)
  if (context === undefined) {
    throw new Error('useRouteState must be used within a RouteProvider')
  }
  return context
}
