const { ApolloServer } = require('apollo-server-express')
const { typeDefs, resolvers } = require('./schema')

const { checkNewUser, getToken, getUser } = require('../auth')

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
            return { user: {} }
          }
        }
        return { user }
      })
      .catch(e => console.log(e))
  },
  playground: true,
  introspection: true
})

module.exports = apolloServer
