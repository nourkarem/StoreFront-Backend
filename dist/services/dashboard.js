"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardQueries = void 0;
const database_1 = __importDefault(require("../database"));
class DashboardQueries {
    // Get all products that have been included in orders
    async productsInOrders() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT name, price, order_id FROM Products INNER JOIN orderproducts ON Products.id = orderproducts.product_id';
            const result = await conn.query(sql);
            conn.release();
            return result.rows;
        }
        catch (err) {
            throw new Error(`unable get products and orders: ${err}`);
        }
    }
    // Get all users that have made orders
    async usersWithOrders() {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql = 'SELECT status FROM orders ';
            const result = await conn.query(sql);
            if (result.rows[0] == 'Current') {
                const sql1 = 'SELECT id FROM orders ';
                const result1 = await conn.query(sql1);
                const orderid = result1.rows[0];
                const sql2 = 'SELECT name, price,quantity FROM Products INNER JOIN orderproducts ON Products.id = orderproducts.product_id AND orderproducts.order_id=($1)';
                const result2 = await conn.query(sql2, [orderid]);
                conn.release();
                return result2.rows;
            }
            return null;
        }
        catch (err) {
            throw new Error(`unable get users with orders: ${err}`);
            return null;
        }
    }
    // Get all users that have made orders
    async getUserData(user_id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql0 = 'SELECT id,user_id,status FROM orders where user_id =$1';
            const res = await conn.query(sql0, [user_id]);
            const order_id = res.rows[0].id;
            const userid = res.rows[0].user_id;
            const status = res.rows[0].status;
            conn.release();
            const data = {
                order_id: order_id,
                user_id: userid,
                status: status
            };
            return data;
        }
        catch (err) {
            throw new Error(`unable get users with orders: ${err}`);
        }
    }
    async userOrders(user_id) {
        try {
            //@ts-ignore
            const conn = await database_1.default.connect();
            const sql0 = 'SELECT id,user_id,status FROM orders where user_id =$1';
            const res = await conn.query(sql0, [user_id]);
            const order_id = res.rows[0].id;
            const status = res.rows[0].status;
            const sql = 'SELECT product_id,quantity FROM orders INNER JOIN orderproducts ON orders.id = orderproducts.order_id';
            const result = await conn.query(sql);
            const products = result.rows;
            conn.release();
            return { order_id, user_id, status, products };
        }
        catch (err) {
            throw new Error(`unable get users with orders: ${err}`);
        }
    }
}
exports.DashboardQueries = DashboardQueries;
