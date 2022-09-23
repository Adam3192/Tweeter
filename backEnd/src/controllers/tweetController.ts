import { RequestHandler } from "express";
import { Tweet, ITweet } from "../models/tweet";
import { IUser, User } from "../models/user";
import { verifyUser } from "../services/auth";


export const getAllTweets: RequestHandler = async (req, res, next) => {
    let tweetList = await Tweet.find();
    res.status(200).json(tweetList);
}

export const getOneTweet: RequestHandler = async (req, res, next) => {
    let itemId = req.params.id;
    let tweet = await Tweet.findById(itemId);
    res.status(200).json(tweet);
}

export const addTweet: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    const newTweet: ITweet = new Tweet({
        name: req.body.name,
        message: req.body.message,
        createdAt: req.body.createdAt
    });

    try {
        await newTweet.save();
        res.status(201).json(newTweet);
    }
    catch (err) {
        res.status(500).send(err);
        console.log(`an error occurred ${err}`)
    }
}

export const editTweet: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    
    const updatedTweet: ITweet = new Tweet({
        _id: itemId,
        name: req.body.name,
        message: req.body.message,
        createdAt: req.body.updatedAt,
    });

    await Tweet.findByIdAndUpdate(itemId, { $set: updatedTweet })

    res.status(200).json(updatedTweet);
}

export const deleteTweet: RequestHandler = async (req, res, next) => {
    let user: IUser | null = await verifyUser(req);

    if (!user) {
        return res.status(403).send();
    }

    let itemId = req.params.id;
    let result = await Tweet.findByIdAndDelete(itemId);
    res.status(200).json(result);
}

export const thisUser: RequestHandler = async (req, res, next) => {
    let name = req.params.name;
    console.log(`user variable is ${name}`)
    let thisUser = await User.find({ username: name });
    res.status(200).json(thisUser);
}

export const currentUserTweets: RequestHandler = async (req, res, next) => {
    let name = req.params.name
    let tweet = await Tweet.find({ name: name });
    res.status(200).json(tweet);
}
