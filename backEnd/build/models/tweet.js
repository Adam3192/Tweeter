"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const mongoose_1 = require("mongoose");
const tweetSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: String,
        required: true
        // default: moment().format("M/D/YYYY, h:mm:ss a")
    }
});
const Tweet = (0, mongoose_1.model)('Tweet', tweetSchema);
exports.Tweet = Tweet;
