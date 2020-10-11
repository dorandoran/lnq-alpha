import express from 'express'
import apolloServer from './gql/server'

const app = express()
const gqlPath = '/gql'
const port = 3000

apolloServer.applyMiddleware({ app, path: gqlPath })

app.listen({ port }, () => {
  console.log(
    `Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
})
