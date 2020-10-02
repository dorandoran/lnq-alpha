import express from 'express'
import apolloServer from './gql/server'
import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/lnq-alpha', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()
const gqlPath = '/gql'
const port = 3000

apolloServer.applyMiddleware({ app, path: gqlPath })

app.listen({ port }, () => {
  console.log(
    `Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
})
