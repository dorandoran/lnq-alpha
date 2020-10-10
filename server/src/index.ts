import express from 'express'
// import mongoose from 'mongoose'

// MongoDB Database Model Imports
// import './database/mongo/models/User'
// import './database/mongo/models/Event'
// import './database/mongo/models/Media'
// import './database/mongo/models/Invite'
// import './database/mongo/models/Follow'

// apolloServer must be imported after Database Models
import apolloServer from './gql/server'

// MongoDB Database Connect
// mongoose.connect('mongodb://localhost:27017/lnq-alpha', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// })

const app = express()
const gqlPath = '/gql'
const port = 3000

apolloServer.applyMiddleware({ app, path: gqlPath })

app.listen({ port }, () => {
  console.log(
    `Server ready at http://localhost:${port}${apolloServer.graphqlPath}`
  )
})
