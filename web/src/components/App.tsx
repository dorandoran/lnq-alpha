import { BrowserRouter, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Home } from '../pages'

import './App.css'

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
      <Router />
    </QueryClientProvider>
  )
}

export default App
