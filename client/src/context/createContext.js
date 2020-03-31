import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'

const CreateContext = createContext()

const initialState = {
  media: []
}

export const CreateProvider = ({ children }) => {
  const [details, setDetails] = useState(initialState)

  const updateDetails = newDetails => {
    setDetails({ ...details, ...newDetails })
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

  return (
    <CreateContext.Provider
      value={{ details, updateDetails, addMedia, removeMedia }}
    >
      {children}
    </CreateContext.Provider>
  )
}

CreateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  selection: PropTypes.string
}

export default CreateContext
