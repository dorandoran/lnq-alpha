import { PLACEHOLDER_18_YRS } from '@util'

export const LoginInputMap = [
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'Password',
    value: 'password'
  }
]

export const SignupInputMap = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Username',
    value: 'username'
  },
  {
    label: 'Date of Birth',
    value: 'dob'
  },
  {
    label: 'Email Address',
    value: 'email'
  },
  {
    label: 'Password',
    value: 'password'
  },
  {
    label: 'Confirm Password',
    value: 'confirmPass'
  }
]

export const OAuthSignupInputMap = [
  {
    label: 'Name',
    value: 'name'
  },
  {
    label: 'Username',
    value: 'username'
  },
  {
    label: 'Date of Birth',
    value: 'dob'
  }
]

export const validateSignup = (data, options) => {
  let error = new Set()

  if (options.disablePass) {
    delete data.password
    delete data.confirmPass
  }

  // Check empty fields
  Object.keys(data).forEach(key => {
    // text inputs
    if (typeof data[key] === 'string' && !data[key].length) {
      error.add('Fields cannot be left empty')
    }

    // dob
    if (data.dob === PLACEHOLDER_18_YRS) {
      error.add('Must select date of birth')
    }
  })

  // Check if passwords match
  if (data.password !== data.confirmPass) {
    error.add('Passwords do not match')
  }

  return [...error]
}
