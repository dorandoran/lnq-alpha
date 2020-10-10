"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import mongoose from 'mongoose'
// MongoDB Database Model Imports
// import './database/mongo/models/User'
// import './database/mongo/models/Event'
// import './database/mongo/models/Media'
// import './database/mongo/models/Invite'
// import './database/mongo/models/Follow'
// apolloServer must be imported after Database Models
var server_1 = __importDefault(require("./gql/server"));
// MongoDB Database Connect
// mongoose.connect('mongodb://localhost:27017/lnq-alpha', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false
// })
var app = express_1.default();
var gqlPath = '/gql';
var port = 3000;
server_1.default.applyMiddleware({ app: app, path: gqlPath });
app.listen({ port: port }, function () {
    console.log("Server ready at http://localhost:" + port + server_1.default.graphqlPath);
});
