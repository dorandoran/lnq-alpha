const express = require('express')
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
require('models/User')

const apolloServer = require('gql/server')
const keys = require('env/dev')

// Database setup
mongoose.connect(keys.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

const app = express()
const gqlPath = '/gql'
const port = process.env.PORT || 3000
apolloServer.applyMiddleware({ app, path: gqlPath })

app.listen({ port }, () => {
  console.log(
    `Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
})
