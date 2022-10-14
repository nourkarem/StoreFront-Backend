"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orders_1 = require("../orders");
const user_1 = require("../user");
const product_1 = require("../product");
const store = new product_1.productStore();
const user = new user_1.userStore();
const order = new orders_1.orderStore();
describe("Order Model", () => {
    it('should have an index method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(order.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(order.delete).toBeDefined();
    });
    it('create method should add an order', async () => {
        const res = await user.create("nour", "karem", "123");
        const result = await order.create(5, "current");
        expect(result).toEqual({
            id: 3,
            user_id: 5,
            status: "current"
        });
    });
    it('index method should return a list of orders', async () => {
        const result = await order.index();
        expect(result).toEqual([{
                id: 3,
                user_id: 5,
                status: "current"
            }]);
    });
    it('show method should return the correct order', async () => {
        const result = await order.show("3");
        expect(result).toEqual({
            id: 3,
            user_id: 5,
            status: "current"
        });
    });
    it('addProductsToOrder method should return the correct orderproduct', async () => {
        const res = await store.create("product1test", 30);
        const result = await order.addProductsToOrder(5, 3, 4);
        expect(result).toEqual({
            id: 3,
            quantity: 5,
            order_id: 3,
            product_id: 4
        });
    });
    it('delete method should remove the order', async () => {
        const result = await order.delete("3");
        const res = await user.delete("5");
        const res1 = await store.delete("4");
        expect(result).toEqual({
            id: 3,
            user_id: 5,
            status: "current"
        });
    });
});
