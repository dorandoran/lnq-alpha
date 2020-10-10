"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocationResolvers = exports.LocationType = void 0;
var apollo_server_express_1 = require("apollo-server-express");
exports.LocationType = apollo_server_express_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  type Location {\n    latitude: Float!\n    longitude: Float!\n    text: String!\n  }\n\n  input LocationInput {\n    latitude: Float!\n    longitude: Float!\n    text: String!\n  }\n"], ["\n  type Location {\n    latitude: Float!\n    longitude: Float!\n    text: String!\n  }\n\n  input LocationInput {\n    latitude: Float!\n    longitude: Float!\n    text: String!\n  }\n"])));
exports.LocationResolvers = {
    Query: {},
    Mutation: {},
    Location: {}
};
var templateObject_1;
