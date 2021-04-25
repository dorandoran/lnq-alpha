import React from 'react'

import { FiSearch } from 'react-icons/fi'
import { IoFilter } from 'react-icons/io5'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import './searchBar.css'

export interface SearchBarProps {
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler
}

interface IFiltersState {
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

const initialFilters = {
  text: '',
  categories: []
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder,
  value,
  onChange
}) => {
  const [filterOpen, setFilterOpen] = React.useState(false)
  const [filters, setFilters] = React.useState<IFiltersState>(initialFilters)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const categoryRef = React.useRef<HTMLDivElement>(null)

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

  const handleFilterClick = () => {
    setFilterOpen(!filterOpen)
  }

  const handleCategoryClick = (category: string) => {
    const index = filters.categories.indexOf(category)
    let categories = []

    if (index > -1) {
      categories = filters.categories.filter((_, idx) => index !== idx)
    } else {
      categories = [category]
    }
    setFilters({ ...filters, categories })
  }

  const isSelectedStyles = (value: string) => {
    if (filters.categories.includes(value)) {
      return { backgroundColor: 'red', color: 'white' }
    }
  }

  return (
    <div className='SearchBar'>
      <div className='SearchBar-input-container' onClick={focusInput}>
        <FiSearch className='SearchBar-search-icon' size='1.5em' />
        <input
          ref={inputRef}
          className='SearchBar-input'
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        <button className='SearchBar-filter-button' onClick={handleFilterClick}>
          <IoFilter className='SearchBar-filter-icon' size='1.5em' />
        </button>
      </div>

      <div className='SearchBar-categories-container'>
        <button
          className='SearchBar-categories-arrow-button'
          onClick={() => scrollCategory(-100)}
        >
          <IoIosArrowBack className='SearchBar-categories-icon' />
        </button>

        <div ref={categoryRef} className='SearchBar-categories-scroll'>
          {enumToArray(SearchBarCategories).map(category => {
            return (
              <button
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
            onClick={() => scrollCategory(100)}
          />
        </button>
      </div>
    </div>
  )
}
