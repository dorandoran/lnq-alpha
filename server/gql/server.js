const { ApolloServer, gql } = require('apollo-server-express')
// const { typeDefs, resolvers } = require('~gql/schema')

// const { checkNewUser, getToken, getUser } = require('../auth/utils')

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!'
  }
}
// GraphQL Setup
const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  // context: ({ req }) => {
  //   const token = getToken(req.headers)
  //   const isNewUser = checkNewUser(req.body)

  //   return getUser(token)
  //     .then(user => {
  //       if (!user) {
  //         if (!isNewUser) {
  //           return { user: {} }
  //         }
  //       }
  //       return { user }
  //     })
  //     .catch(e => console.log(e))
  // },
  playground: true,
  introspection: true
})

module.exports = apolloServer
