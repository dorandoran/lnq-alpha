import { ApolloServer, AuthenticationError } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'
import { checkNewUser, getToken, getUser } from '../authentication/utils'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  context: async ({ req }) => {
    const token = getToken(req.headers)
    const isNewUser = checkNewUser(req.body)
    const user = await getUser(token)

    if (isNewUser) return { user: {} }
    if (!user) throw new AuthenticationError('Must be logged in.')
    return { user }
  }
})

export default apolloServer
