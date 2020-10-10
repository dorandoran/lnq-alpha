import { GraphQLScalarType, Kind, ValueNode } from 'graphql'

export const DateResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Scalar of Javascript Date',
    // For Queries, value from the client
    parseValue(value: string) {
      return new Date(value)
    },
    // Value sent to the client
    serialize(value: string | FirebaseFirestore.Timestamp) {
      if (typeof value === 'string') return value
      return value.toDate()
    },
    // For Mutations, ast value is always in string format
    parseLiteral(ast: ValueNode) {
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value)
      }

      return null
    }
  })
}
