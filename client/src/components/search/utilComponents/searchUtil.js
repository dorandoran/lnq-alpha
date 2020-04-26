import { EVENT_TYPE_ARRAY } from '@util/constants'

export const categoryList = [
  // { label: 'Near Me', value: 'near' },
  // { label: 'Suggested', value: 'suggest' },
  ...EVENT_TYPE_ARRAY
]

export const buildSearchVars = ({ query, bucket, page, categories }) => {
  const variables = {
    query,
    bucket,
    filters: ''
  }
  if (categories !== 'near' && categories !== 'suggest') {
    variables.filters = categories.join(' OR ')
  }
  return variables
}
