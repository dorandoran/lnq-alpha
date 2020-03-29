const { GraphQLScalarType } = require('graphql')
const { Timestamp } = require('@google-cloud/firestore')

exports.resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Scalar of Javascript Date',
    // For Queries, value from the client
    parseValue(value) {
      const date = new Date(value)
      return Timestamp.fromDate(date)
    },
    // Value sent to the cleint
    serialize(value) {
      return value.toDate()
    },
    // For Mutations, ast value is always in string format
    parseLiteral(ast) {
      const date = new Date(ast.value)
      return Timestamp.fromDate(date)
    }
  })
}
