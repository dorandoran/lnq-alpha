import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { TOMORROW_DATETIME } from '@common/constants'

const CreateContext = createContext()

export const CreateProvider = ({ children, initialMedia }) => {
  const initialState = {
    name: '',
    type: '',
    location: '',
    date: TOMORROW_DATETIME,
    description: '',
    plusOne: true,
    isPrivate: true,
    media: [initialMedia]
  }
  const [details, setDetails] = useState(initialState)

  const updateDetails = (key, input) => {
    setDetails({ ...details, [key]: input })
  }

  const addMedia = item => {
    setDetails({ ...details, media: [...details.media, item] })
  }

  const removeMedia = index => {
    setDetails({
      ...details,
      media: details.media.filter((_, idx) => index !== idx)
    })
  }

  const resetDetails = () => {
    setDetails(initialState)
  }

  return (
    <CreateContext.Provider
      value={{ details, updateDetails, addMedia, removeMedia, resetDetails }}
    >
      {children}
    </CreateContext.Provider>
  )
}

CreateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialMedia: PropTypes.object.isRequired
}

export default CreateContext
