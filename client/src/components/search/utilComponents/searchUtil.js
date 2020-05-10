import { EVENT_TYPES_ARRAY } from '@util/constants'

export const categoryList = [
  // { label: 'Near Me', value: 'near' },
  // { label: 'Suggested', value: 'suggest' },
  ...EVENT_TYPES_ARRAY
]

export const buildSearchVars = ({ query, bucket, page, categories }) => {
  const variables = {
    query,
    bucket,
    filters: 'isPrivate=0'
  }
  if (categories.length && categories !== 'near' && categories !== 'suggest') {
    variables.filters += ` AND ${categories.join(' OR ')}`
  }
  return variables
}
