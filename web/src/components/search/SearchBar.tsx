import React from 'react'
import Slider from 'react-slick'

import useSearch, { ISearchContext } from '../../context/searchContext'
import useOverlay from '../hooks/useOverlay'

import { FiSearch } from 'react-icons/fi'
import { IoFilter } from 'react-icons/io5'

import './searchBar.css'

const SEARCH_INPUT_PLACEHOLDER = 'Search'

export interface IFiltersState {
  text: string
  categories: string[]
}

interface SearchBarProps {
  className?: string
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

export const SearchBar: React.FC<SearchBarProps> = props => {
  const [filterOpen, setFilterOpen] = React.useState(false)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const {
    updateText,
    updateCategories,
    runSearch,
    searchState
  } = useSearch() as ISearchContext
  const { throwLoading } = useOverlay()

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 4
  }

  const focusInput = () => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus()
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
    console.log('clicked ', category)
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
      return 'SearchBar-categories-button-selected'
    }
  }
  console.log(filterOpen)
  return (
    <div className={`SearchBar ${props.className ? props.className : ''}`}>
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

        {filterOpen ? (
          <button
            className='SearchBar-filter-button cancel'
            onClick={handleFilterClick}
          >
            Cancel
          </button>
        ) : (
          <button
            className='SearchBar-filter-button'
            onClick={handleFilterClick}
          >
            <IoFilter className='SearchBar-filter-icon' size='1.5em' />
          </button>
        )}
      </form>

      {filterOpen ? (
        <React.Fragment>
          <div className='SearchBar-filter-categories'>
            <button className='SearchBar-filter-categories-button'>
              Event
            </button>
          </div>
          <div className='SearchBar-filter-menu'>
            <div>
              <h1>Current Location</h1>
              <button className='SearchBar-filter-menu-button'>Where</button>
            </div>
            <div>
              <h1>Whenever</h1>
            </div>
            <button className='SearchBar-filter-menu-button'>When</button>
            <div>
              <h1>Whatever</h1>
            </div>
            <button className='SearchBar-filter-menu-button'>What</button>
          </div>
        </React.Fragment>
      ) : (
        <Slider {...sliderSettings}>
          {enumToArray(SearchBarCategories).map(category => {
            return (
              <div
                key={category}
                className='SearchBar-categories-button-container'
              >
                <button
                  className={`SearchBar-categories-button ${isSelectedStyles(
                    category
                  )}`}
                  onClick={() => handleCategoryClick(category)}
                >
                  {category}
                </button>
              </div>
            )
          })}
        </Slider>
      )}
    </div>
  )
}
