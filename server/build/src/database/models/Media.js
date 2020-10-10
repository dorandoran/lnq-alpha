"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var mediaSchema = new Schema({
    id: {
        type: String,
        unique: true,
        required: true,
        default: function () { return new mongoose_1.default.Types.ObjectId(); }
    },
    ownerId: String,
    linkIds: [String],
    uri: String,
    created_at: { type: Date, default: Date.now }
});
mongoose_1.default.model('media', mediaSchema);
