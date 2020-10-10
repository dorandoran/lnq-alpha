"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.typeDefs = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var lodash_1 = require("lodash");
var DateDef_1 = require("./typeDefs/DateDef");
var UserDef_1 = require("./typeDefs/UserDef");
var EventDef_1 = require("./typeDefs/EventDef");
var MediaDef_1 = require("./typeDefs/MediaDef");
var LocationDef_1 = require("./typeDefs/LocationDef");
var SocialLinkDef_1 = require("./typeDefs/SocialLinkDef");
var OtherType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  scalar Date\n\n  type Query {\n    user(id: String): User\n    event(id: String!): Event\n    media(id: String!): Media\n    getUserEvents(id: String): [Event]\n    # search(bucket: String!, query: String, filters: String, page: Int): [Hit]\n    # userSearch(query: String, page: Int, following: [String]): [UserHit]\n  }\n\n  type Mutation {\n    createUser(\n      id: String!\n      firstName: String!\n      lastName: String!\n      email: String!\n    ): User\n    createEvent(\n      id: String!\n      ownerId: String!\n      avatarId: String!\n      name: String!\n      type: String!\n      date: Date!\n      location: LocationInput!\n      website: String\n      description: String!\n      plusOne: Boolean!\n      isPrivate: Boolean!\n      recipientIds: [String]\n      followIds: [String]\n    ): Event\n    createMedia(ownerId: String!, uri: String!, linkId: String): Media\n    createInvites(recipientIds: [String!], eventId: String!): [SocialLink]\n    requestFollow(recipientIds: [String!]): [SocialLink]\n    updateUser(id: String!, updates: UserUpdateInput!): User\n    updateEvent(id: String!, updates: EventUpdateInput!): Event\n    deleteEvent(id: String!): Boolean\n  }\n"], ["\n  scalar Date\n\n  type Query {\n    user(id: String): User\n    event(id: String!): Event\n    media(id: String!): Media\n    getUserEvents(id: String): [Event]\n    # search(bucket: String!, query: String, filters: String, page: Int): [Hit]\n    # userSearch(query: String, page: Int, following: [String]): [UserHit]\n  }\n\n  type Mutation {\n    createUser(\n      id: String!\n      firstName: String!\n      lastName: String!\n      email: String!\n    ): User\n    createEvent(\n      id: String!\n      ownerId: String!\n      avatarId: String!\n      name: String!\n      type: String!\n      date: Date!\n      location: LocationInput!\n      website: String\n      description: String!\n      plusOne: Boolean!\n      isPrivate: Boolean!\n      recipientIds: [String]\n      followIds: [String]\n    ): Event\n    createMedia(ownerId: String!, uri: String!, linkId: String): Media\n    createInvites(recipientIds: [String!], eventId: String!): [SocialLink]\n    requestFollow(recipientIds: [String!]): [SocialLink]\n    updateUser(id: String!, updates: UserUpdateInput!): User\n    updateEvent(id: String!, updates: EventUpdateInput!): Event\n    deleteEvent(id: String!): Boolean\n  }\n"])));
exports.typeDefs = [
    OtherType,
    UserDef_1.UserType,
    EventDef_1.EventType,
    MediaDef_1.MediaType,
    LocationDef_1.LocationType,
    SocialLinkDef_1.SocialLinkType
];
exports.resolvers = lodash_1.merge(DateDef_1.DateResolvers, UserDef_1.UserResolvers, EventDef_1.EventResolvers, MediaDef_1.MediaResolvers, LocationDef_1.LocationResolvers, SocialLinkDef_1.SocialLinkResolvers);
var templateObject_1;
