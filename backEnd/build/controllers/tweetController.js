"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUserTweets = exports.thisUser = exports.deleteTweet = exports.editTweet = exports.addTweet = exports.getOneTweet = exports.getAllTweets = void 0;
const tweet_1 = require("../models/tweet");
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const getAllTweets = async (req, res, next) => {
    let tweetList = await tweet_1.Tweet.find();
    res.status(200).json(tweetList);
};
exports.getAllTweets = getAllTweets;
const getOneTweet = async (req, res, next) => {
    let itemId = req.params.id;
    let tweet = await tweet_1.Tweet.findById(itemId);
    res.status(200).json(tweet);
};
exports.getOneTweet = getOneTweet;
const addTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    const newTweet = new tweet_1.Tweet({
        name: req.body.name,
        message: req.body.message,
        // createdAt: req.body.createdAt
    });
    try {
        await newTweet.save();
        res.status(201).json(newTweet);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(`an error occurred ${err}`);
    }
};
exports.addTweet = addTweet;
const editTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    const updatedTweet = new tweet_1.Tweet({
        _id: itemId,
        name: req.body.name,
        message: req.body.message,
        // price: req.body.price
    });
    await tweet_1.Tweet.findByIdAndUpdate(itemId, { $set: updatedTweet });
    res.status(200).json(updatedTweet);
};
exports.editTweet = editTweet;
const deleteTweet = async (req, res, next) => {
    let user = await (0, auth_1.verifyUser)(req);
    if (!user) {
        return res.status(403).send();
    }
    let itemId = req.params.id;
    let result = await tweet_1.Tweet.findByIdAndDelete(itemId);
    res.status(200).json(result);
};
exports.deleteTweet = deleteTweet;
const thisUser = async (req, res, next) => {
    let name = req.params.name;
    console.log(`user variable is ${name}`);
    let thisUser = await user_1.User.find({ username: name });
    res.status(200).json(thisUser);
};
exports.thisUser = thisUser;
const currentUserTweets = async (req, res, next) => {
    let name = req.params.name;
    console.log(`tweet variable is ${name}`);
    let tweet = await tweet_1.Tweet.find({ name: name });
    res.status(200).json(tweet);
};
exports.currentUserTweets = currentUserTweets;
