import React from 'react'

import { SearchBar } from '../components/search/SearchBar'
import { SearchResults } from '../components/search/SearchResults'

import './Search.css'

const Search = () => {
  return (
    <div className='Search'>
      <header className='Search-header'>
        <p className='Search-header-logo'>LNQ Alpha</p>

        <SearchBar className='Search-header-search-bar' />
      </header>

      <div className='Search-results'>
        <div className='Search-results-header-text'>All Events</div>
        <SearchResults />
      </div>
    </div>
  )
}

export default Search
