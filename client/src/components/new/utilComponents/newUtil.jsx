import { EVENT_TYPES_ARRAY } from '@util'

export const inputMap = [
  {
    label: 'Name',
    value: 'name'
  },
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
