import React from 'react'
// import axios from 'axios'
// import { useQuery } from 'react-query'

import { SearchBar } from '../components/search/SearchBar'
import { SearchResults } from '../components/search/SearchResults'

import './Search.css'

const Search = () => {
  return (
    <div className='Search'>
      <header className='Search-header'>
        <p>LNQ Alpha</p>

        <SearchBar />

        <p />
      </header>

      <div className='Search-results'>
        <SearchResults />
      </div>
    </div>
  )
}

export default Search
