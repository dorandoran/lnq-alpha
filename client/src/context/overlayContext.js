import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

/**
 * Overlay State
 * modal: {
 *   type:string    | 'event' or 'user'   | Required
 *   data:object    | Event or User data  | Optional
 * }
 *
 * dialog: {
 *   id:string      | Dialog identifier   | Required
 *   cache:object   | Temporary storage   | Optional
 * }
 *
 */

const initialState = {
  modal: {
    type: null,
    data: {}
  },
  dialog: {
    id: null,
    cache: {}
  }
}

const actions = {
  modal: {
    open: 'openModal',
    close: 'closeModal'
  },
  dialog: {
    updateCache: 'updateCache',
    clearCache: 'clearCache',
    close: 'closeDialog',
    events: {
      addMedia: 'addMedia',
      deleteMedia: 'deleteMedia'
    }
  }
}

const reducer = (state, action) => {
  const { modal, dialog } = actions
  switch (action.type) {
    // Modal
    case modal.open:
      return {
        ...state,
        modal: {
          type: action.payload.type,
          data: action.payload.data
        },
        dialog: {
          cache: { media: action.payload.data.avatar }
        }
      }
    case modal.close:
      return initialState
    // Dialog
    // Events
    case dialog.events.addMedia:
      return {
        ...state,
        dialog: { ...state.dialog, id: actions.dialog.events.addMedia }
      }
    case dialog.events.deleteMedia:
      return {
        ...state,
        dialog: { ...state.dialog, id: actions.dialog.events.deleteMedia }
      }
    case dialog.updateCache:
      return {
        ...state,
        dialog: {
          ...state.dialog,
          cache: { ...state.dialog.cache, ...action.payload }
        }
      }
    case dialog.clearCache:
      return {
        ...state,
        dialog: { ...state.dialog, cache: {} }
      }
    case dialog.close: {
      const cache =
        action.payload === actions.dialog.clearCache
          ? {}
          : { ...state.dialog.cache, ...action.payload }

      return {
        ...state,
        dialog: {
          ...state.dialog,
          id: null,
          cache
        }
      }
    }
    default:
      throw new Error('OverlayContext: Proper action-type not used!')
  }
}

// Context
const OverlayContext = createContext()

// Provider
export const OverlayProvider = ({ children }) => {
  const [overlayState, dispatch] = useReducer(reducer, initialState)
  const { modal, dialog } = overlayState

  return (
    <OverlayContext.Provider value={{ modal, dialog, dispatch, actions }}>
      {children}
    </OverlayContext.Provider>
  )
}

// PropTypes
OverlayProvider.propTypes = {
  children: PropTypes.node
}

// useContext
const useOverlay = () => {
  const context = useContext(OverlayContext)
  if (context === undefined) {
    throw new Error('useOverlay must be used within an OverlayProvider')
  }
  return context
}

export default useOverlay
