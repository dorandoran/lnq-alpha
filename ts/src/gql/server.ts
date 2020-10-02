import { ApolloServer } from 'apollo-server-express'
import { resolvers, typeDefs } from './schema'

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
})

export default apolloServer
