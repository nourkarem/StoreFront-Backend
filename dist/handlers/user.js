"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const userstore = new user_1.userStore();
const index = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader !== undefined) {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "");
        }
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const users = await userstore.index();
    res.json(users);
};
const show = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader !== undefined) {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "");
        }
    }
    catch (err) {
        res.status(401);
        res.json('Access denied, invalid token');
        return;
    }
    const user = await userstore.show(req.params.id);
    res.json(user);
};
const create = async (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;
        const user = await userstore.create(firstName, lastName, password);
        var token = jsonwebtoken_1.default.sign({ firstName, lastName, password }, process.env.TOKEN_SECRET || "");
        res.json(token);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const userRoutes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};
exports.default = userRoutes;
