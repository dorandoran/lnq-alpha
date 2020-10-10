"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolvers = exports.UserType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var controllers_1 = require("../../database/controllers");
exports.UserType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type User {\n    id: String!\n    username: String\n    firstName: String!\n    lastName: String!\n    dob: Date\n    email: String!\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    numEvents: Int\n    numFollowers: Int\n    numFollowing: Int\n    categories: [String]\n    events: [Event]\n    invites: [SocialLink]\n    followers: [SocialLink]\n    following: [SocialLink]\n    allowFollowers: Boolean\n    created_at: Date\n  }\n\n  input UserUpdateInput {\n    username: String\n    firstName: String\n    lastName: String\n    dob: Date\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    categories: [String]\n    allowFollowers: Boolean\n  }\n"], ["\n  type User {\n    id: String!\n    username: String\n    firstName: String!\n    lastName: String!\n    dob: Date\n    email: String!\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    numEvents: Int\n    numFollowers: Int\n    numFollowing: Int\n    categories: [String]\n    events: [Event]\n    invites: [SocialLink]\n    followers: [SocialLink]\n    following: [SocialLink]\n    allowFollowers: Boolean\n    created_at: Date\n  }\n\n  input UserUpdateInput {\n    username: String\n    firstName: String\n    lastName: String\n    dob: Date\n    description: String\n    avatarUrl: String\n    website: String\n    new: Boolean\n    categories: [String]\n    allowFollowers: Boolean\n  }\n"])));
exports.UserResolvers = {
    Query: {
        user: function (obj, args, context) {
            var id = args.id || (context === null || context === void 0 ? void 0 : context.user.id);
            return controllers_1.UserController.findById(id);
        }
    },
    Mutation: {
        createUser: function (parent, args) {
            return controllers_1.UserController.create(args);
        },
        updateUser: function (parent, args) {
            return controllers_1.UserController.update(args);
        }
    },
    User: {
        events: function (parent) {
            return controllers_1.EventController.findAllByOwnerId(parent.id);
        },
        invites: function (parent) {
            return controllers_1.InviteController.findAllByRecipientId(parent.id);
        },
        following: function (parent, args, context) {
            var id = context.user.id;
            return controllers_1.FollowController.findAllBySenderId(id);
        },
        followers: function (parent, args, context) {
            var id = context.user.id;
            return controllers_1.FollowController.findAllByRecipientId(id);
        }
    }
};
var templateObject_1;
