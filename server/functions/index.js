const functions = require('firebase-functions')
const {
  ApolloServer,
  AuthenticationError
} = require('apollo-server-cloud-functions')
const { typeDefs, resolvers } = require('./gql/schema')

const { checkNewUser, getToken, getUser } = require('./auth')

// GraphQL Setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = getToken(req.headers)
    const isNewUser = checkNewUser(req.body)

    return getUser(token)
      .then(user => {
        if (!user) {
          if (!isNewUser) {
            throw new AuthenticationError('must authenticate')
          }
        }
        return { user }
      })
      .catch(e => console.log(e))
  },
  playground: true,
  introspection: true
})

// Endpoint...
exports.graphql = functions.https.onRequest(apolloServer.createHandler())

/*  When developing backend, create new endpoint and only deploy that function
    Step 1: Create new endpoint
    exports.[ENDPOINT NAME] = functions.https.onRequest(apolloServer.createHandler())

    Step 2: Only deploy test function
    firebase deploy --only functions:[ENDPOINT NAME]

    Step 3: Change client to point at test endpoint

    Step 4: Profit.
*/

exports.test2 = functions.https.onRequest(apolloServer.createHandler())
