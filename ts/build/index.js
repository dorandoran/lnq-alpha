"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var server_1 = __importDefault(require("./gql/server"));
var mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb://localhost:27017/lnq-alpha', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
var app = express_1.default();
var gqlPath = '/gql';
var port = 3000;
server_1.default.applyMiddleware({ app: app, path: gqlPath });
app.listen({ port: port }, function () {
    console.log("Server ready at http://localhost:" + port + server_1.default.graphqlPath);
});
