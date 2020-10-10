"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    dob: Date,
    description: String,
    avatarUrl: String,
    website: String,
    new: Boolean,
    categories: [String],
    allowFollowers: Boolean,
    created_at: { type: Date, default: Date.now }
});
mongoose_1.default.model('users', userSchema);
