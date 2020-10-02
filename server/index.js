const express = require('express')

const mongoose = require('mongoose')
require('./database/models/User')

const apolloServer = require('./gql/server')
const keys = require('./env/dev')

// Database setup
mongoose.connect(keys.mongoUri, {
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
