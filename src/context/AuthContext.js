// createDataContext helper function that makes it easier to create multiple Context files
import createDataContext from './createDataContext'
import firebase from 'firebase'
// an import from our navigation utility file allowing us to navigate here in context
import { navigate } from '../navigationRef'

const authReducer = (state, action) => {
  switch(action.type) {
  case 'SIGN_UP':
    return { ...state, token: action.payload }
  case 'ADD_USER_INFO':
  	return { ...state, userInfo: action.payload }
  case 'ADD_ERROR':
  	return { ...state, errorMessage: action.payload }
  case 'CLEAR_ERROR':
  	return { ...state, errorMessage: action.payload }
  default:
    return state
  }
}

// cleans up error messages
const clearErrorMessage = dispatch => () => {
  dispatch({ type: 'CLEAR_ERROR', payload: null })
}

const passwordValidation = dispatch => ({ password, confirmPass }) => {
  if (password !== confirmPass) {
    dispatch({ type: 'ADD_ERROR', payload: 'Passwords must match!' })
  }
}

// stores current users name and username for future db storage
const getCurrentUserInfo = dispatch => async ({ name, username }) => {
  const user = await firebase.auth().currentUser
  if (user) {
    dispatch({ type: 'ADD_USER_INFO', payload: { name, username } })
  } else {
  	// user logged out
  }
}

const signup = dispatch => async ({ email, password }) => {
  try {
    await firebase.auth().createUserWithEmailAndPassword(email, password)
    await firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const token = user.uid
	  	dispatch({ type: 'SIGN_UP', payload: token })
      } else {
      	// user is logged out
	  }
    })
    navigate('Home')
  } catch (error) {
    dispatch({ type: 'ADD_ERROR', payload: error.message })
  }
}

const signin = dispatch => () => {
  // sign in logic
}

export const { Context, Provider } = createDataContext(
  authReducer,
  { signin, signup, getCurrentUserInfo, passwordValidation, clearErrorMessage },
  { token: null, errorMessage: null, userInfo: {} }
)