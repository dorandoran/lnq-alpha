import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'
import { TOMORROW_DATETIME } from '@components/util/constants'
import { screenMap } from '@components/create/utilComponents/createUtil'

const CreateContext = createContext()

export const CreateProvider = ({ children, initialMedia }) => {
  const { DETAILS } = screenMap
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

  const [screen, setScreen] = useState(DETAILS)
  const [details, setDetails] = useState(initialState)

  const updateDetails = (key, input) => {
    setDetails({ ...details, [key]: input })
  }

  const addMedia = item => {
    setDetails({ ...details, media: [...details.media, item] })
  }

  const updateMedia = (index, newMedia = null) => {
    const media = [...details.media]
    media.splice(index, 1, newMedia)
    setDetails({ ...details, media })
  }

  const removeMedia = index => {
    setDetails({
      ...details,
      media: details.media.filter((_, idx) => index !== idx)
    })
  }

  const resetDetails = () => {
    setScreen(DETAILS)
    setDetails(initialState)
  }

  return (
    <CreateContext.Provider
      value={{
        details,
        screen,
        setScreen,
        updateDetails,
        addMedia,
        updateMedia,
        removeMedia,
        resetDetails
      }}
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
