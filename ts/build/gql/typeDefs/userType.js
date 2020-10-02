"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDef = void 0;
var apollo_server_express_1 = require("apollo-server-express");
require("../../database/models/User");
var controllers_1 = require("../../database/controllers");
exports.typeDef = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: String!\n    username: String\n    firstName: String!\n    lastName: String!\n    dob: Date\n    email: String!\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    numEvents: Int\n    numFollowers: Int\n    numFollowing: Int\n    categories: [String]\n    allowFollowers: Boolean\n    created_at: Date\n  }\n\n  input UserUpdateInput {\n    username: String\n    firstName: String\n    lastName: String\n    dob: Date\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    categories: [String]\n    allowFollowers: Boolean\n  }\n"], ["\n  type User {\n    id: String!\n    username: String\n    firstName: String!\n    lastName: String!\n    dob: Date\n    email: String!\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    numEvents: Int\n    numFollowers: Int\n    numFollowing: Int\n    categories: [String]\n    allowFollowers: Boolean\n    created_at: Date\n  }\n\n  input UserUpdateInput {\n    username: String\n    firstName: String\n    lastName: String\n    dob: Date\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    categories: [String]\n    allowFollowers: Boolean\n  }\n"])));
exports.resolvers = {
    // Global query
    Query: {
        user: function (obj, args, context) {
            var id = args.id || (context === null || context === void 0 ? void 0 : context.user.id);
            return controllers_1.UserController.findById(id);
        }
    },
    Mutation: {
        createUser: function (parent, args) {
            return controllers_1.UserController.save(args);
        },
        updateUser: function (parent, args) {
            return ;
        }
    },
    // Field Resolve
    User: {}
};
var templateObject_1;
