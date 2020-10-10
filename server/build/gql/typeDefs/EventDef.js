"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventResolvers = exports.EventType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var controllers_1 = require("../../database/firestore/controllers");
exports.EventType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Event {\n    id: String!\n    ownerId: String\n    owner: User\n    avatar: Avatar\n    name: String\n    type: String\n    date: Date\n    location: Location\n    website: String\n    description: String\n    updated_at: Date\n    created_at: Date\n    media: [Media]\n    likes: [String]\n    numLikes: Int\n    plusOne: Boolean\n    isPrivate: Boolean\n    invites: [SocialLink]\n  }\n\n  type Avatar {\n    id: String\n    uri: String\n  }\n\n  input EventUpdateInput {\n    name: String\n    type: String\n    date: Date\n    location: LocationInput\n    website: String\n    description: String\n    plusOne: Boolean\n    isPrivate: Boolean\n  }\n\n  input AvatarInput {\n    id: String\n    uri: String\n  }\n"], ["\n  type Event {\n    id: String!\n    ownerId: String\n    owner: User\n    avatar: Avatar\n    name: String\n    type: String\n    date: Date\n    location: Location\n    website: String\n    description: String\n    updated_at: Date\n    created_at: Date\n    media: [Media]\n    likes: [String]\n    numLikes: Int\n    plusOne: Boolean\n    isPrivate: Boolean\n    invites: [SocialLink]\n  }\n\n  type Avatar {\n    id: String\n    uri: String\n  }\n\n  input EventUpdateInput {\n    name: String\n    type: String\n    date: Date\n    location: LocationInput\n    website: String\n    description: String\n    plusOne: Boolean\n    isPrivate: Boolean\n  }\n\n  input AvatarInput {\n    id: String\n    uri: String\n  }\n"])));
exports.EventResolvers = {
    Query: {
        event: function (obj, args) {
            return controllers_1.EventController.findById(args.id);
        },
        getUserEvents: function (obj, args, context) {
            var id = args.id || (context === null || context === void 0 ? void 0 : context.user.id);
            return controllers_1.EventController.findAllByOwnerId(id);
        }
    },
    Mutation: {
        createEvent: function (parent, args) {
            return controllers_1.EventController.create(args);
        },
        updateEvent: function (parent, args) {
            return controllers_1.EventController.update(args);
        },
        deleteEvent: function (parent, args) {
            return controllers_1.EventController.remove(args.id);
        }
    },
    Event: {
        owner: function (parent) {
            return controllers_1.UserController.findById(parent.ownerId);
        },
        avatar: function (parent) {
            return controllers_1.MediaController.findById(parent.avatar.id);
        },
        media: function (_a) {
            var id = _a.id, avatar = _a.avatar;
            return controllers_1.MediaController.findAllByLinkId(id, avatar.id);
        },
        invites: function (parent) {
            return controllers_1.InviteController.findAllByEventId(parent.id);
        }
    }
};
var templateObject_1;
