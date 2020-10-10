"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateResolvers = void 0;
var graphql_1 = require("graphql");
exports.DateResolvers = {
    Date: new graphql_1.GraphQLScalarType({
        name: 'Date',
        description: 'Custom Scalar of Javascript Date',
        // For Queries, value from the client
        parseValue: function (value) {
            return new Date(value);
        },
        // Value sent to the client
        serialize: function (value) {
            if (typeof value === 'string')
                return value;
            return value.toDate();
        },
        // For Mutations, ast value is always in string format
        parseLiteral: function (ast) {
            if (ast.kind === graphql_1.Kind.STRING) {
                return new Date(ast.value);
            }
            return null;
        }
    })
};
