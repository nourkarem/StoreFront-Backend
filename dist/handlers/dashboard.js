"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dashboard_1 = require("../services/dashboard");
const dashboardRoutes = (app) => {
    app.get('/products_in_orders', productsInOrders),
        app.get('/users-with-orders', usersWithOrders),
        app.get('/userOrders', userOrders);
};
const dashboard = new dashboard_1.DashboardQueries();
const productsInOrders = async (_req, res) => {
    try {
        const products = await dashboard.productsInOrders();
        res.json(products);
    }
    catch (err) {
        console.log(`${err}`);
    }
};
const usersWithOrders = async (_req, res) => {
    try {
        const users = await dashboard.usersWithOrders();
        res.json(users);
    }
    catch (err) {
        console.log(`${err}`);
    }
};
const userOrders = async (req, res) => {
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
        const users = await dashboard.userOrders(req.body.user_id);
        res.json(users);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
};
const getUserData = async (req, res) => {
    try {
        const users = await dashboard.getUserData(req.body.user_id);
        res.json(users);
    }
    catch (err) {
        console.log(`${err}`);
    }
};
exports.default = dashboardRoutes;
