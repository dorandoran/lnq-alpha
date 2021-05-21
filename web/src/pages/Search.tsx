import React from 'react'
import { useHistory } from 'react-router-dom'

import { SearchBar } from '../components/search/SearchBar'
import { SearchResults } from '../components/search/SearchResults'

import './Search.css'

const Search = () => {
  const history = useHistory()

  const handleLogoClick = () => {
    history.push('/home')
  }

  return (
    <div className='Search'>
      <header className='Search-header'>
        <button className='Search-header-logo' onClick={handleLogoClick}>
          LNQ Alpha
        </button>

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
