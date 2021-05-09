import React from 'react'
import useSearchQuery from '../components/hooks/useSearchQuery'

import { SearchBar } from '../components/search/SearchBar'

import './Home.css'

const Home = () => {
  useSearchQuery()

  return (
    <div className='Home'>
      <h3>LNQ Alpha</h3>

      <SearchBar />
    </div>
  )
}

export default Home
