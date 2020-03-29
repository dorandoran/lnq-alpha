import React, { createContext, useState } from 'react'

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
    setDetails({ media: [...details.media, item] })
  }

  return (
    <CreateContext.Provider value={{ data: details, updateDetails, addMedia }}>
      {children}
    </CreateContext.Provider>
  )
}

export default CreateContext
