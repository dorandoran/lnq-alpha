/* eslint-disable no-useless-escape */
import { EVENT_TYPES_ARRAY } from '@util'

export const inputMap = [
  {
    label: 'Username',
    value: 'username'
  },
  {
    label: 'Birthday',
    value: 'dob'
  },
  {
    label: 'Website',
    value: 'website',
    keyboardType: 'email-address',
    autoCapitalize: 'none'
  }
]

export const categoryMap = EVENT_TYPES_ARRAY.map((item, index) => {
  return {
    ...item,
    backgroundColor: `rgb(${Math.floor(Math.random() * 255)}, ${
      index * 5
    }, ${132})`
  }
})

export const validateUpdates = updates => {
  let error = new Set()

  const checkLength = (input, label) => {
    if (6 > input.length > 0) {
      error.add(`- ${label} must be at least 6 characters!`)
    }
    return null
  }

  const checkUrl = input => {
    if (
      !input.match(
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
      )
    ) {
      error.add('- Not a valid website url!')
    }
  }

  Object.keys(updates).forEach(key => {
    const input = updates[key]
    const label = inputMap.find(({ value }) => value === key).label
    // username
    if (key === 'username') {
      checkLength(input, label)
    }

    // website
    if (key === 'website') {
      checkLength(input, label)
      checkUrl(input)
    }
  })

  return [...error]
}

export const formatCategories = categories => {
  return categories.map(item => {
    return item.value
  })
}
