"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialLinkResolvers = exports.SocialLinkType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var controllers_1 = require("../../database/controllers");
exports.SocialLinkType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  enum SocialLinkAnswer {\n    REQUESTED\n    ACCEPTED\n    MAYBE\n    DECLINED\n    INTERESTED\n  }\n\n  enum SocialLinkType {\n    INVITE\n    FOLLOW\n  }\n\n  type SocialLink {\n    id: String!\n    type: SocialLinkType!\n    recipientId: String!\n    recipient: User\n    senderId: String!\n    sender: User\n    eventId: String\n    event: Event\n    message: String\n    answer: SocialLinkAnswer!\n    updated_at: Date!\n  }\n"], ["\n  enum SocialLinkAnswer {\n    REQUESTED\n    ACCEPTED\n    MAYBE\n    DECLINED\n    INTERESTED\n  }\n\n  enum SocialLinkType {\n    INVITE\n    FOLLOW\n  }\n\n  type SocialLink {\n    id: String!\n    type: SocialLinkType!\n    recipientId: String!\n    recipient: User\n    senderId: String!\n    sender: User\n    eventId: String\n    event: Event\n    message: String\n    answer: SocialLinkAnswer!\n    updated_at: Date!\n  }\n"])));
exports.SocialLinkResolvers = {
    Query: {},
    Mutation: {
        createInvites: function (parent, args, context) {
            args.senderId = context.user.id;
            return controllers_1.InviteController.saveAll(args);
        },
        requestFollow: function (parent, args, context) {
            args.senderId = context.user.id;
            return controllers_1.FollowController.saveAll(args);
        }
    },
    SocialLink: {
        recipient: function (parent) {
            return controllers_1.UserController.findById(parent.recipientId);
        },
        sender: function (parent) {
            return controllers_1.UserController.findById(parent.senderId);
        },
        event: function (parent) {
            if (parent.eventId) {
                return controllers_1.EventController.findById(parent.eventId);
            }
            return null;
        }
    }
};
var templateObject_1;
