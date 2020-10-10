"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var eventSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: function () { return new mongoose_1.default.Types.ObjectId(); }
    },
    ownerId: String,
    avatarId: String,
    name: String,
    type: String,
    date: Date,
    location: {
        latitude: Number,
        longitude: Number,
        text: String
    },
    website: String,
    description: String,
    likes: [String],
    plusOne: Boolean,
    isPrivate: Boolean,
    created_at: { type: Date, default: Date.now }
});
mongoose_1.default.model('events', eventSchema);
