import { BrowserRouter, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { SearchProvider } from '../context/searchContext'
import { Home } from '../pages'

const queryClient = new QueryClient()

const Router = () => {
  return (
    <BrowserRouter>
      <Route exact path='/' component={Home} />
      <Route path='/home' component={Home} />
    </BrowserRouter>
  )
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SearchProvider>
        <Router />
      </SearchProvider>
    </QueryClientProvider>
  )
}

export default App
