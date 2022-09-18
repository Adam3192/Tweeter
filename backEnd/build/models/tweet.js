"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const mongoose_1 = require("mongoose");
const moment_1 = __importDefault(require("moment"));
const tweetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        default: (0, moment_1.default)().format("M/D/YYYY, h:mm:ss a")
    }
});
const Tweet = (0, mongoose_1.model)('Tweet', tweetSchema);
exports.Tweet = Tweet;
