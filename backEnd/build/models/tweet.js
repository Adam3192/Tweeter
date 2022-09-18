"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const mongoose_1 = require("mongoose");
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
        type: Date,
        // allowNull: false,
        default: Date.now,
    }
    //   timestamps: {
    //     createdAt: true,
    //     updatedAt: false,
    //   },
});
const Tweet = (0, mongoose_1.model)('Tweet', tweetSchema);
exports.Tweet = Tweet;
