import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'

import { SearchProvider } from '../context/searchContext'

import Search from '../pages/Search'
import { Home } from '../pages'
import { Footer } from './common/Footer'

const queryClient = new QueryClient()

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/home' component={Home} />
        <Route path='/search' component={Search} />
      </Switch>
      <Footer />
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
