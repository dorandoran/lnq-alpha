import React from 'react'
import dayjs from 'dayjs'

import useSearchQuery from '../hooks/useSearchQuery'

import { BiDollar } from 'react-icons/bi'
import { MdLocationOn } from 'react-icons/md'
import { FiClock } from 'react-icons/fi'
import GridLoader from 'react-spinners/GridLoader'

import './searchResults.css'

const TEST_DATA = {
  name: 'Test 5',
  url: 'www.test5.com',
  date: '2019-10-09T13:00:00Z',
  img:
    'https://images.unsplash.com/photo-1619340207451-b8dee65a7546?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'
}

export interface SearchResultCardProps {
  name: string
  url: string
  date: string
  img: string
  price?: string
  location?: string
}

export const SearchResults: React.FC = () => {
  const { error, data, isLoading } = useSearchQuery()

  if (isLoading) {
    return <GridLoader loading={true} color='red' size={100} />
  }

  console.log(data)
  console.log(error)

  return (
    <React.Fragment>
      {/* {data?.map((result: JSX.IntrinsicAttributes & SearchResultCardProps & { children?: React.ReactNode; }) => {
        return <SearchResultCard {...result} />
      })} */}
      <SearchResultCard {...TEST_DATA} />
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
  const formatDateTime = (dateTime: string) => {
    return dayjs(dateTime).format('ddd, MMM D, YYYY | h:mm A')
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
