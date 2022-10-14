"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const orderstore = new orders_1.orderStore();
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
    try {
        const orders = await orderstore.index();
        res.json(orders);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
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
    try {
        const order = await orderstore.show(req.params.id);
        res.json(order);
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
        const user_id = req.body.user_id;
        const status = req.body.status;
        const order = await orderstore.create(user_id, status);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const addproductsToOrder = async (req, res) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (authorizationHeader !== undefined) {
            const token = authorizationHeader.split(' ')[1];
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET || "");
        }
        const quantity = req.body.quantity;
        const product_id = req.body.product_id;
        const order_id = req.body.order_id;
        const order = await orderstore.addProductsToOrder(quantity, order_id, product_id);
        res.json(order);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const orderRoutes = (app) => {
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders', create);
    // add product
    app.post('/orders/:id/products', addproductsToOrder);
};
exports.default = orderRoutes;
