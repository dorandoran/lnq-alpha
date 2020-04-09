import { createRef } from 'react'

export const navigationRef = createRef()

export const navigate = (routeName, params) => {
    navigationRef.current?.navigate(routeName, params)
}