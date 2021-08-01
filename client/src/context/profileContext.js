import React, { createContext, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'

import useUser from '@context/userContext'

import { getUserFormFields, SCREEN } from '@components/profile/utilComponents/profileUtil'

// Reducer
export const actions = {
  navigateMain: 'navigateMain',
  navigateNotifications: 'navigateNotifications',
  navigateInbox: 'navigateInbox',
  navigateNewMessage: 'navigateNewMessage',
  addMessageRecipients: 'addMessageRecipients',
  navigateEditForm: 'navigateEditForm',
  updateEditForm: 'updateEditForm',
  openModal: 'openModal',
  closeModal: 'closeModal',
  resetForm: 'resetForm'
}

function reducer(state, action) {
  switch (action.type) {
    case actions.navigateMain: {
      return {
        ...state,
        screen: SCREEN.MAIN,
        title: '',
        modal: null,
      }
    }
    case actions.navigateNotifications: {
      return {
        ...state,
        screen: SCREEN.NOTIFICATIONS,
        title: 'Notifications',
        modal: null
      }
    }
    case actions.navigateInbox: {
      return {
        ...state,
        screen: SCREEN.INBOX,
        title: 'Inbox',
        modal: null
      }
    }
    case actions.navigateNewMessage: {
      return {
        ...state,
        screen: SCREEN.MESSAGE,
        title: 'Message',
        modal: null
      }
    }
    case actions.navigateEditForm: {
      return {
        ...state,
        screen: SCREEN.EDIT,
        title: 'Edit Profile',
        modal: null
      }
    }
    case actions.addMessageRecipients: {
      return {
        ...state,
        title: action.payload.map(i => `@${i.username}`).join(', '),
        messageRecipients: [...state.messageRecipients, ...action.payload]
      }
    }
    case actions.updateEditForm: {
      return {
        ...state,
        form: { ...state.form, ...action.payload },
        modal: null
      }
    }
    case actions.openModal: {
      return {
        ...state,
        modal: action.payload
      }
    }
    case actions.closeModal: {
      return {
        ...state,
        modal: null
      }
    }
    case actions.reset: {
      return action.payload
    }
    default:
      // TODO: Error handling
      throw new Error('Issue in profileContext.js')
  }
}

// Context
const ProfileContext = createContext()

export const ProfileProvider = ({ children }) => {
  const { user } = useUser()
  const initialUser = getUserFormFields(user)
  const initialState = {
    screen: SCREEN.MAIN,
    title: '',
    messageRecipients: [],
    initialUser,
    form: initialUser,
    modal: null
  }
  const [profileState, dispatch] = useReducer(reducer, initialState)

  const reset = () => {
    dispatch({ type: actions.reset, payload: initialState })
  }

  return (
    <ProfileContext.Provider value={{ profileState, dispatch, actions, reset }}>
      {children}
    </ProfileContext.Provider>
  )
}

const useProfile = () => {
  const context = useContext(ProfileContext)
  if (context === undefined) {
    throw new Error('useSearch must be used within a ProfileProvider')
  }
  return context
}

ProfileProvider.propTypes = {
  children: PropTypes.node
}

export default useProfile
