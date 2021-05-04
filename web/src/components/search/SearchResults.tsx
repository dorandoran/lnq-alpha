import React from 'react'

import { BiDollar } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'
import { FiClock } from 'react-icons/fi'

import './searchResults.css'

export interface SearchResultsProps {
  data: SearchResultCardProps[]
}

export interface SearchResultCardProps {
  name: string
  url: string
  date: string
  img: string
  price?: string
  location?: string
}

export const SearchResults: React.FC<SearchResultsProps> = ({ data }) => {
  return (
    <React.Fragment>
      {data.map(result => {
        return <SearchResultCard {...result} />
      })}
    </React.Fragment>
  )
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  name,
  url,
  date,
  img,
  price,
  location
}) => {
  return (
    <div className='SearchResultCard'>
      <img
        className='SearchResultCard-information-img'
        src={img}
        alt={`Event: ${name}`}
      />

      <div className='SearchResultCard-information'>
        <div className='SearchResultCard-information-name'>{name}</div>

        <div className='SearchResultCard-information-text'>
          <BiDollar
            className='SearchResultCard-information-icon'
            size='1.5em'
          />
          {price ? price : '0'}
        </div>

        <div className='SearchResultCard-information-text'>
          <MdLocationOn
            className='SearchResultCard-information-icon'
            size='1.5em'
          />
          {location ? location : url}
        </div>

        <div className='SearchResultCard-information-text'>
          <FiClock className='SearchResultCard-information-icon' size='1.5em' />
          {date}
        </div>
      </div>
    </div>
  )
}
