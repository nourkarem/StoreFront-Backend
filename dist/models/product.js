"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products  ';
            const res = await conn.query(sql);
            const products = res.rows;
            conn.release();
            return products;
        }
        catch (err) {
            throw new Error(`Could not get products. Error: ${err}`);
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT * FROM products where id=($1) ';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`Could not find product ${id}. Error: ${err}`);
        }
    }
    async create(name, price) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO products (name,price) Values($1,$2) RETURNING * ';
            const res = await conn.query(sql, [name, price]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`Could not add new book ${name}. Error: ${err}`);
        }
    }
    async update(id, price) {
        try {
            const sql = 'Update products SET price=($2) WHERE id=($1) Returning id,name,price ';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id, price]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM products WHERE id=($1) Returning id,name,price ';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const product = result.rows[0];
            conn.release();
            return product;
        }
        catch (err) {
            throw new Error(`Could not delete product ${id}. Error: ${err}`);
        }
    }
}
exports.productStore = productStore;
