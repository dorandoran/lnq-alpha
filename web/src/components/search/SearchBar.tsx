import React from 'react'

import useSearch, { ISearchContext } from '../../context/searchContext'
import useOverlay from '../hooks/useOverlay'

import { FiSearch } from 'react-icons/fi'
import { IoFilter } from 'react-icons/io5'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import './searchBar.css'

const CATEGORY_SCROLL_OFFSET = 100
const SEARCH_INPUT_PLACEHOLDER = 'Search'

export interface IFiltersState {
  text: string
  categories: string[]
}

export enum SearchBarCategories {
  NEAR = 'near me',
  SUGGESTED = 'suggested',
  EATS = 'eats',
  MUSIC = 'music',
  SOCIAL = 'social',
  GAMING = 'gaming',
  SPORTS = 'sports & fitness',
  FASHION = 'fashion',
  AUTO = 'auto',
  SPIRIT = 'spirituality',
  BUSINESS = 'business'
}

export function enumToMap(enumeration: any): Map<string, string> {
  const map = new Map<string, string>()
  for (let key in enumeration) {
    //TypeScript does not allow enum keys to be numeric
    if (!isNaN(Number(key))) continue

    const val = enumeration[key] as string
    //TypeScript does not allow enum value to be null or undefined
    if (val !== undefined && val !== null) map.set(key, val)
  }

  return map
}

export function enumToArray(enumeration: any): Array<string> {
  const map = enumToMap(enumeration)
  return Array.from(map.values())
}

export const SearchBar: React.FC = () => {
  const [filterOpen, setFilterOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const categoryRef = React.useRef<HTMLDivElement>(null)
  const {
    updateText,
    updateCategories,
    runSearch,
    searchState
  } = useSearch() as ISearchContext
  const { throwLoading } = useOverlay()

  const focusInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
    }
  }

  const scrollCategory = (offset: number) => {
    if (categoryRef && categoryRef.current) {
      categoryRef.current.scrollLeft += offset
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    updateText(e.target.value)
  }

  const handleFilterClick = (e: React.FormEvent) => {
    e.preventDefault()
    setFilterOpen(!filterOpen)
  }

  const handleCategoryClick = (category: string) => {
    updateCategories(category)
  }

  const handleSubmit = () => {
    throwLoading()
    runSearch()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit()
    }
  }

  const isSelectedStyles = (value: string) => {
    if (searchState.categories.includes(value)) {
      return { backgroundColor: 'red', color: 'white' }
    }
  }
  console.log(searchState)
  return (
    <div className='SearchBar'>
      <form
        className='SearchBar-input-container'
        onClick={focusInput}
        onSubmit={handleSubmit}
      >
        <FiSearch
          className='SearchBar-search-icon'
          size='1.5em'
          onClick={handleSubmit}
        />
        <input
          ref={inputRef}
          className='SearchBar-input'
          placeholder={SEARCH_INPUT_PLACEHOLDER}
          value={searchState.text}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className='SearchBar-filter-button' onClick={handleFilterClick}>
          <IoFilter className='SearchBar-filter-icon' size='1.5em' />
        </button>
      </form>

      <div className='SearchBar-categories-container'>
        <button
          className='SearchBar-categories-arrow-button'
          onClick={() => scrollCategory(-CATEGORY_SCROLL_OFFSET)}
        >
          <IoIosArrowBack className='SearchBar-categories-icon' />
        </button>

        <div ref={categoryRef} className='SearchBar-categories-scroll'>
          {enumToArray(SearchBarCategories).map(category => {
            return (
              <button
                key={category}
                className='SearchBar-categories-button'
                style={isSelectedStyles(category)}
                onClick={() => handleCategoryClick(category)}
              >
                {category}
              </button>
            )
          })}
        </div>

        <button className='SearchBar-categories-arrow-button'>
          <IoIosArrowForward
            className='SearchBar-categories-icon'
            onClick={() => scrollCategory(CATEGORY_SCROLL_OFFSET)}
          />
        </button>
      </div>
    </div>
  )
}
