"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.timestamp = exports.storage = exports.firestore = exports.auth = void 0;
var firebase_admin_1 = __importDefault(require("firebase-admin"));
var credentials_json_1 = __importDefault(require("../../config/credentials.json"));
var serviceAccount = credentials_json_1.default.google;
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(serviceAccount),
    storageBucket: 'lnq-alpha.appspot.com'
});
exports.auth = firebase_admin_1.default.auth;
exports.firestore = firebase_admin_1.default.firestore;
exports.storage = firebase_admin_1.default.storage().bucket;
exports.timestamp = firebase_admin_1.default.firestore.Timestamp;
