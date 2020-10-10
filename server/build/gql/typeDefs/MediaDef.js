"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaResolvers = exports.MediaType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
var controllers_1 = require("../../database/firestore/controllers");
exports.MediaType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Media {\n    id: String!\n    ownerId: String!\n    linkIds: [String]\n    uri: String!\n    created_at: Date\n  }\n\n  type StorageResponse {\n    completed: Boolean!\n    error: String\n  }\n\n  input MediaInput {\n    id: String\n    ownerId: String\n    linkIds: [String]\n    uri: String\n    created_at: Date\n  }\n"], ["\n  type Media {\n    id: String!\n    ownerId: String!\n    linkIds: [String]\n    uri: String!\n    created_at: Date\n  }\n\n  type StorageResponse {\n    completed: Boolean!\n    error: String\n  }\n\n  input MediaInput {\n    id: String\n    ownerId: String\n    linkIds: [String]\n    uri: String\n    created_at: Date\n  }\n"])));
exports.MediaResolvers = {
    Query: {
        media: function (obj, args) {
            return controllers_1.MediaController.findById(args.id);
        }
    },
    Mutation: {
        createMedia: function (parent, args) {
            return controllers_1.MediaController.create(args);
        },
        deleteMedia: function (parent, args) {
            return controllers_1.MediaController.remove(args);
        }
    },
    Media: {}
};
var templateObject_1;
