import React from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'

const CLOUD_ENDPOINT = 'https://us-central1-lnq-alpha.cloudfunctions.net/search'

const Home = () => {
  const [text, setText] = React.useState('')
  const [pressed, setPressed] = React.useState(false)
  const { isLoading, error, data } = useQuery(
    'search',
    async () => {
      const response = await axios.get(CLOUD_ENDPOINT, {
        params: { text }
      })
      setPressed(false)
      return response
    },
    { enabled: pressed }
  )

  const handleSubmit = e => {
    e.preventDefault()
    setPressed(true)
  }
  console.log(data)

  if (error) {
    console.log('error ', error)
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <form className='Search' onSubmit={handleSubmit}>
          <input
            className='Search-input'
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button className='Search-submit' type='submit'>
            Search
          </button>
        </form>
        {isLoading && <h3>Loading</h3>}
        {/* {error && <h4>{error}</h4>} */}
      </header>
    </div>
  )
}

export default Home
