"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var inviteSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: function () { return new mongoose_1.default.Types.ObjectId(); }
    },
    recipientId: String,
    senderId: String,
    eventId: String,
    message: String,
    answer: String,
    updated_at: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now }
});
mongoose_1.default.model('invites', inviteSchema);
