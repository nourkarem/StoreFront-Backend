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
exports.userStore = void 0;
// @ts-ignore
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
let pepper = 'new1';
let SaltRounds = '10';
class userStore {
    async index() {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id,firstname,lastname FROM users ';
            const res = await conn.query(sql);
            conn.release();
            return res.rows;
        }
        catch (err) {
            throw new Error(`unable to show all users`);
            return null;
        }
    }
    async show(id) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT id,firstname,lastname FROM users Where id=($1)  ';
            const res = await conn.query(sql, [id]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`unable to show user whose id ${id} `);
            return null;
        }
    }
    // create 
    async create(firstname, lastname, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'INSERT INTO users (firstname,lastname,password)Values($1,$2,$3) RETURNING id,firstname,lastname';
            const hash = bcrypt_1.default.hashSync(password + pepper, parseInt(SaltRounds));
            const res = await conn.query(sql, [firstname, lastname, hash]);
            conn.release();
            return res.rows[0];
        }
        catch (err) {
            throw new Error(`unable create user (${firstname}): ${err}`);
        }
    }
    async authenticate(firstname, lastname, password) {
        try {
            const conn = await database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE firstname =($1) AND lastname =($2) ';
            const res = await conn.query(sql, [firstname, lastname]);
            if (res.rows.length) {
                const user = res.rows[0];
                if (bcrypt_1.default.compareSync(password + pepper, user.password)) {
                    return user;
                }
            }
            return null;
        }
        catch (err) {
            console.log(`err`);
            return null;
        }
    }
    async delete(id) {
        try {
            const sql = 'DELETE FROM users WHERE id=($1) Returning id,firstname,lastname';
            // @ts-ignore
            const conn = await database_1.default.connect();
            const result = await conn.query(sql, [id]);
            const user = result.rows[0];
            conn.release();
            return user;
        }
        catch (err) {
            throw new Error(`Could not delete book ${id}. Error: ${err}`);
        }
    }
}
exports.userStore = userStore;
