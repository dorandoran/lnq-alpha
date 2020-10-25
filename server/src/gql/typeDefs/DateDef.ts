import admin from 'firebase-admin'
import { GraphQLScalarType, Kind, ValueNode } from 'graphql'
const timestamp = admin.firestore.Timestamp

export const DateResolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Scalar of Javascript Date',
    // For Queries, value from the client
    parseValue(value: string) {
      const date = new Date(value)
      return timestamp.fromDate(date)
    },
    // Value sent to the client
    serialize(value: string | FirebaseFirestore.Timestamp) {
      if (typeof value === 'string') return value
      return value.toDate()
    },
    // For Mutations, ast value is always in string format
    parseLiteral(ast: ValueNode) {
      if (ast.kind === Kind.STRING) {
        const date = new Date(ast.value)
        timestamp.fromDate(date)
      }
      return null
    }
  })
}
