"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../models/product");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const productstore = new product_1.productStore();
const index = async (_req, res) => {
    try {
        const products = await productstore.index();
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const show = async (req, res) => {
    try {
        const product = await productstore.show(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const create = async (req, res) => {
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
    try {
        const name = req.body.name;
        const price = req.body.price;
        const product = await productstore.create(name, price);
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const ProductRoutes = (app) => {
    app.get('/products', index);
    app.get('/products/:id', show);
    app.post('/products', create);
};
exports.default = ProductRoutes;
