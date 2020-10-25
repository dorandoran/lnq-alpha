import { EVENT_TYPES_ARRAY } from '@util'

export const categoryList = [
  // { label: 'Near Me', value: 'near' },
  // { label: 'Suggested', value: 'suggest' },
  ...EVENT_TYPES_ARRAY
]

export const buildSearchVars = ({ query, bucket, page, categories }) => {
  const variables = {
    query,
    bucket,
    filters: ''
  }
  if (categories.length && categories !== 'near' && categories !== 'suggest') {
    variables.filters += `${categories.join(' OR ')}`
  }
  return variables
}
