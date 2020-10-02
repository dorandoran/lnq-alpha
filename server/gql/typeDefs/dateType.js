const { GraphQLScalarType } = require('graphql')

exports.resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Scalar of Javascript Date',
    // For Queries, value from the client
    parseValue(value) {
      return new Date(value)
    },
    // Value sent to the client
    serialize(value) {
      if (typeof value === 'string') return value
      return value.getTime()
    },
    // For Mutations, ast value is always in string format
    parseLiteral(ast) {
      return new Date(ast.value)
    }
  })
}
