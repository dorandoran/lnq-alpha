import { useContext } from 'react'
import { useQuery } from '@apollo/react-hooks'
import SearchContext from '@context/searchContext'
import { Search } from '@graphql/search/queries'
import { buildSearchVars } from '@components/search/utilComponents/searchUtil'

const useSearchQuery = () => {
  const { searchState } = useContext(SearchContext)
  const variables = buildSearchVars(searchState)

  const { data, loading, refetch } = useQuery(Search, { variables })

  return { variables, data, loading, refetch }
}

export default useSearchQuery
