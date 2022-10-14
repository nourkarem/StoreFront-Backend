"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../../server"));
const user_1 = require("../../models/user");
const product_1 = require("../../models/product");
const UserStore = new user_1.userStore();
const product = new product_1.productStore();
describe("products spec endpoint test for the storefront API", () => {
    const request = (0, supertest_1.default)(server_1.default);
    let productToken;
    beforeAll(async () => {
        const response = await request.post("/users").send({
            firstName: "nour",
            lastName: "karem",
            password: "password123",
        }).set("Accept", "application/json");
        expect(response.status).toBe(200);
        productToken = response.body;
    });
    it("should create a new product on -> POST /products", async () => {
        const response = await request.post("/products").send({
            name: "product1test",
            price: 40
        }).set("Accept", "application/json").set("Authorization", `Bearer ${productToken}`);
        expect(response.body.price).toEqual(40);
    });
    it("should return a list of all products on -> GET /products", async () => {
        const response = await request.get("/products");
        expect(response.status).toBe(200);
    });
    it("should return the correct product on -> GET /products/:id", async () => {
        const response = await request.get("/products/3");
        expect(response.body.name).toEqual("product1test");
    });
    afterAll(async () => {
        await product.delete('3');
        const result = await UserStore.delete("3");
    });
});
