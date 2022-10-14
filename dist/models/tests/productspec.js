"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_1 = require("../product");
const store = new product_1.productStore();
describe("Product Model", () => {
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(store.index).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(store.delete).toBeDefined();
    });
    it('create method should add a product', async () => {
        const result = await store.create("product1test", 30);
        expect(result).toEqual({
            id: 5,
            name: "product1test",
            price: 30
        });
    });
    it('index method should return a list of products', async () => {
        const result = await store.index();
        expect(result).toEqual([{
                id: 5,
                name: "product1test",
                price: 30
            }]);
    });
    it('show method should return the correct product', async () => {
        const result = await store.show("5");
        expect(result).toEqual({
            id: 5,
            name: "product1test",
            price: 30
        });
    });
    it('Update method should update price of the product', async () => {
        const result = await store.update("5", 40);
        expect(result).toEqual({
            id: 5,
            name: "product1test",
            price: 40
        });
    });
    it('delete method should remove the product', async () => {
        const result = await store.delete("5");
        expect(result).toEqual({
            id: 5,
            name: "product1test",
            price: 40
        });
    });
});
