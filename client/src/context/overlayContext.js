import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

/**
 * Overlay State
 * modal: {
 *   type: string    | 'event' or 'user'   | Required
 *   data: object    | Event or User data  | Optional
 * }
 *
 * dialog: {
 *   id: string      | Dialog identifier   | Required
 *   cache: any      | Temporary storage   | Optional
 * }
 *
 * Event Dialog Cache State
 *  cache : {
 *    media: { id: string, isAvatar: boolean }
 * }
 */

const initialDialogState = {
  id: null,
  cache: {}
}

const initialState = {
  modal: {
    type: null,
    data: {}
  },
  dialog: initialDialogState
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
      deleteMedia: 'deleteMedia',
      changeAvatar: 'changeAvatar',
      update: 'updateEvent',
      delete: 'deleteEvent'
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
        }
      }
    case modal.close:
      return initialState
    // Dialog
    // Events
    case dialog.events.addMedia:
      return {
        ...state,
        dialog: { id: actions.dialog.events.addMedia }
      }
    case dialog.events.deleteMedia:
      return {
        ...state,
        dialog: {
          id: actions.dialog.events.deleteMedia,
          cache: action.payload
        }
      }
    case dialog.events.changeAvatar:
      return {
        ...state,
        dialog: {
          id: actions.dialog.events.changeAvatar,
          cache: action.payload
        }
      }
    case dialog.events.update:
      return {
        ...state,
        dialog: {
          id: actions.dialog.events.update,
          cache: action.payload
        }
      }
    case dialog.events.delete:
      return {
        ...state,
        dialog: {
          id: actions.dialog.events.delete,
          cache: action.payload
        }
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
      return { ...state, dialog: initialDialogState }
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
