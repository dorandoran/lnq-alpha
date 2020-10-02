"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var lodash_1 = require("lodash");
var dateType_1 = require("./typeDefs/dateType");
var userType_1 = require("./typeDefs/userType");
var OtherType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  scalar Date\n\n  type Query {\n    user(id: String): User\n  }\n\n  type Mutation {\n    createUser(\n      id: String!\n      firstName: String!\n      lastName: String!\n      email: String!\n    ): User\n  }\n"], ["\n  scalar Date\n\n  type Query {\n    user(id: String): User\n  }\n\n  type Mutation {\n    createUser(\n      id: String!\n      firstName: String!\n      lastName: String!\n      email: String!\n    ): User\n  }\n"])));
exports.typeDefs = [OtherType, userType_1.typeDef];
exports.resolvers = lodash_1.merge(dateType_1.resolvers, userType_1.resolvers);
var templateObject_1;
