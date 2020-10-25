import { useQuery } from '@apollo/client'
import useSearch from '@context/searchContext'
import { EventSearch } from '@graphql/search/queries'
import { buildSearchVars } from '@components/search/utilComponents/searchUtil'

const useSearchQuery = () => {
  const { searchState } = useSearch()
  const variables = buildSearchVars(searchState)

  const { data, loading, refetch } = useQuery(EventSearch, { variables })

  return { variables, data, loading, refetch }
}

export default useSearchQuery
