import axios from 'axios'
import { useQuery } from 'react-query'

import useSearch, { ISearchContext } from '../../context/searchContext'

const CLOUD_ENDPOINT = 'https://us-central1-lnq-alpha.cloudfunctions.net/search'

const useSearchQuery = () => {
  const { searchState, endSearch } = useSearch() as ISearchContext
  const { text } = searchState

  const { error, data, isLoading } = useQuery(
    'search',
    async () => {
      const response = await axios.get(CLOUD_ENDPOINT, {
        params: { text }
      })
      endSearch()
      return response
    },
    { enabled: searchState.searching }
  )

  return { error, data, isLoading }
}

export default useSearchQuery
