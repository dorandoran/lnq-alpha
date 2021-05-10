import React from 'react'
import dayjs from 'dayjs'

import useSearchQuery from '../hooks/useSearchQuery'

import { BiDollar } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'
import { FiClock } from 'react-icons/fi'

import './searchResults.css'

export interface SearchResultCardProps {
  name: string
  url: string
  date: string
  img: string
  price?: string
  location?: string
}

export const SearchResults: React.FC = () => {
  const { error, data } = useSearchQuery()

  console.log(data)
  console.log(error)

  if (data?.ebNew) {
    return (
      <React.Fragment>
        {data.ebNew.map(
          (
            result: JSX.IntrinsicAttributes &
              SearchResultCardProps & { children?: React.ReactNode },
            index: number
          ) => {
            return <SearchResultCard key={index} {...result} />
          }
        )}
      </React.Fragment>
    )
  }

  return <div />
}

const SearchResultCard: React.FC<SearchResultCardProps> = ({
  name,
  url,
  date,
  img,
  price,
  location
}) => {
  const formatDateTime = (dateTime: string) => {
    let date = dayjs(dateTime).format('ddd, MMM D, YYYY | h:mm A')

    if (date === 'Invalid Date') {
      date = dateTime
    }
    return date
  }

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
          {formatDateTime(date)}
        </div>
      </div>
    </div>
  )
}
