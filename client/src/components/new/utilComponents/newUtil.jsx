import { EVENT_TYPES_ARRAY, PLACEHOLDER_18_YRS } from '@util'

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
    value: 'website'
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

  Object.keys(updates).forEach(key => {
    // username
    if (key === 'username' && !updates[key].length) {
      error.add('Username cannot be left empty')
    }
  })

  // dob
  if (updates.dob === PLACEHOLDER_18_YRS) {
    error.add('Must select date of birth')
  }

  return [...error]
}

export const formatCategories = categories => {
  return categories.map(item => {
    return item.value
  })
}
