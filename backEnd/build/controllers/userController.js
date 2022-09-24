"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.getCurrentUser2 = exports.thisUser = exports.searchUsers = exports.getCurrentUser = exports.loginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const auth_1 = require("../services/auth");
const createUser = async (req, res, next) => {
    const newUser = new user_1.User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        city: req.body.city,
        state: req.body.state,
    });
    try {
        if (newUser.username && newUser.password) {
            let hashedPassword = await (0, auth_1.hashPassword)(newUser.password);
            newUser.password = hashedPassword;
            let created = await newUser.save();
            res.status(201).json({
                username: created.username,
                userId: created._id
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
    }
    catch (err) {
        res.status(500).send(err);
    }
};
exports.createUser = createUser;
const loginUser = async (req, res, next) => {
    let existingUser = await user_1.User.findOne({ username: req.body.username });
    if (existingUser) {
        let passwordsMatch = await (0, auth_1.comparePasswords)(req.body.password, existingUser.password);
        if (passwordsMatch) {
            let token = await (0, auth_1.signUserToken)(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
};
exports.loginUser = loginUser;
const getCurrentUser = async (req, res, next) => {
    let existingUser = await (0, auth_1.verifyUser)(req);
    if (existingUser) {
        res.status(200).json(existingUser);
    }
    else {
        res.status(401).send();
    }
};
exports.getCurrentUser = getCurrentUser;
const searchUsers = async (req, res, next) => {
    let searchInput = req.headers.authorization;
    let searchResult = await user_1.User.find({ username: searchInput });
    res.status(200).json(searchResult);
};
exports.searchUsers = searchUsers;
const thisUser = async (req, res, next) => {
    let name = req.params.name;
    let thisUser = await user_1.User.find({ username: name });
    res.status(200).json(thisUser);
};
exports.thisUser = thisUser;
const getCurrentUser2 = async (req, res, next) => {
    let thisUser = await (0, auth_1.verifyUser2)(req);
    if (thisUser) {
        res.status(200).json(thisUser);
    }
    else {
        res.status(401).send();
    }
};
exports.getCurrentUser2 = getCurrentUser2;
const getAllUsers = async (req, res, next) => {
    let allUsers = await user_1.User.find();
    res.status(200).json(allUsers);
};
exports.getAllUsers = getAllUsers;
