import React, { createContext, useContext, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { TOMORROW_DATETIME } from '@util'
import { SCREEN } from '@components/create/utilComponents/createUtil'

const CreateContext = createContext()

export const CreateProvider = ({ children, initialMedia }) => {
  const initialState = { imageEdit: false }
  const initialDetailState = {
    name: '',
    type: '',
    location: null,
    date: TOMORROW_DATETIME,
    description: '',
    website: '',
    plusOne: true,
    isPrivate: true,
    recipientIds: [],
    followIds: [],
    media: []
  }

  const [screen, setScreen] = useState(SCREEN.DETAILS)
  const [state, setState] = useState(initialState)
  const [details, setDetails] = useState({
    ...initialDetailState,
    media: [initialMedia]
  })

  // Edit Details/Media Functions
  const updateDetails = (key, input) => {
    if (key === 'recipientIds' || key === 'followIds') {
      const index = details[key].indexOf(input)
      let newDetail = []

      if (index > -1) {
        newDetail = details[key].filter((_, idx) => index !== idx)
      } else {
        newDetail = [...details[key], input]
      }

      setDetails({ ...details, [key]: newDetail })
    } else {
      setDetails({ ...details, [key]: input })
    }
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

  // Reset the initial media if user cancels and comes back
  useEffect(() => {
    if (!details.media.includes(initialMedia)) {
      updateDetails('media', [initialMedia])
    }
  }, [initialMedia])

  const resetDetails = () => {
    setScreen(SCREEN.DETAILS)
    setDetails(initialDetailState)
    setState(initialState)
  }

  // Image Edit Functions
  const toggleImageEdit = () => {
    setState({ ...state, imageEdit: !state.imageEdit })
  }

  const closeImageEdit = () => {
    setState({ ...state, imageEdit: false })
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
        resetDetails,
        imageEdit: state.imageEdit,
        toggleImageEdit,
        closeImageEdit
      }}
    >
      {children}
    </CreateContext.Provider>
  )
}

const useCreate = () => {
  const context = useContext(CreateContext)
  if (context === undefined) {
    throw new Error('useCreate must be used within a CreateProvider')
  }
  return context
}

CreateProvider.propTypes = {
  children: PropTypes.node.isRequired,
  initialMedia: PropTypes.object.isRequired
}

export default useCreate
