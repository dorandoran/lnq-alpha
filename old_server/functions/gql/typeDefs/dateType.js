const { GraphQLScalarType } = require('graphql')
const admin = require('firebase-admin')
const timestamp = admin.firestore.Timestamp

exports.resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Scalar of Javascript Date',
    // For Queries, value from the client
    parseValue (value) {
      const date = new Date(value)
      return timestamp.fromDate(date)
    },
    // Value sent to the client
    serialize (value) {
      if (typeof value === 'string') return value
      return value.toDate()
    },
    // For Mutations, ast value is always in string format
    parseLiteral (ast) {
      const date = new Date(ast.value)
      return timestamp.fromDate(date)
    }
  })
}
