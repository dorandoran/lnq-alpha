import express from 'express'
import { graphqlUploadExpress } from 'graphql-upload'
import apolloServer from './gql/server'

const app = express()
const gqlPath = '/gql'
const port = 4000

apolloServer.start().then(() => {
  app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }))
  apolloServer.applyMiddleware({ app, path: gqlPath })
})

app.listen({ port }, () => {
  console.log(`Server ready at http://localhost:${port}/${gqlPath}`)
})
