"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchResolvers = exports.SearchType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var algolia_1 = require("../../search/algolia");
exports.SearchType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Search {\n    hits: [Hit]\n  }\n\n  type UserHit {\n    id: String!\n    username: String\n    firstName: String!\n    lastName: String!\n    avatarUrl: String\n    description: String\n    isFollowing: Boolean\n  }\n\n  type EventHit {\n    id: String!\n    ownerId: String\n    owner: User\n    avatar: Avatar\n    name: String\n    type: String\n    date: Date\n    location: Location\n    website: String\n    description: String\n    updated_at: Date\n    created_at: Date\n    media: [Media]\n    likes: [String]\n    numLikes: Int\n    plusOne: Boolean\n    isPrivate: Boolean\n  }\n"], ["\n  type Search {\n    hits: [Hit]\n  }\n\n  type UserHit {\n    id: String!\n    username: String\n    firstName: String!\n    lastName: String!\n    avatarUrl: String\n    description: String\n    isFollowing: Boolean\n  }\n\n  type EventHit {\n    id: String!\n    ownerId: String\n    owner: User\n    avatar: Avatar\n    name: String\n    type: String\n    date: Date\n    location: Location\n    website: String\n    description: String\n    updated_at: Date\n    created_at: Date\n    media: [Media]\n    likes: [String]\n    numLikes: Int\n    plusOne: Boolean\n    isPrivate: Boolean\n  }\n"])));
exports.SearchResolvers = {
    // Global Query
    Query: {
        search: function (obj, args) {
            return algolia_1.SearchController.base(args);
        },
        userSearch: function (obj, args, context) {
            args.userId = context.user.id;
            return algolia_1.SearchController.user(args);
        }
    },
    // Mutations
    Mutation: {},
    // Field Resolve
    Search: {},
    Hit: {
        __resolveType: function (obj) {
            if (obj.firstName)
                return 'UserHit';
            if (obj.ownerId)
                return 'EventHit';
            return null;
        }
    }
};
var templateObject_1;
