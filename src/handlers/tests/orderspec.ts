import supertest from "supertest";
import app from "../../server";
import jwt, { Secret } from "jsonwebtoken";
import { order,orderproducts,orderStore } from "../../models/orders";
import { user,userStore } from "../../models/user";
import { productStore } from "../../models/product";

const UserStore = new userStore();
const ProductStore = new productStore();
const order = new orderStore();
describe("orderss spec endpoint test for the storefront API", () => {
    const request = supertest(app);
    let OrderToken : string;

    beforeAll(async () => {
        const response= await request.post("/users").send({
            firstName: "nour",
            lastName: "karem",
            password: "password123",
        }).set("Accept", "application/json");
        expect(response.status).toBe(200);
        OrderToken  = response.body;
        const responseProduct = await request.post("/products").send({
            name :"product1test",
             price:40  
         }).set("Accept", "application/json").set("Authorization", `Bearer ${OrderToken}`);
         expect(responseProduct.body.price).toEqual(40);
      
    });

    it("should create a new order on -> POST /orders", async () => {
        const response = await request.post("/orders").send({
            user_id:2,
            status:'current'
        }).set("Accept", "application/json").set("Authorization", `Bearer ${OrderToken}`);
        expect(response.body.status).toEqual('current');
    });

    it("should return a list of all orders on -> GET /orders", async () => {
        const response = await request.get("/orders").set("Authorization", `Bearer ${OrderToken}`);;
        expect(response.status).toBe(200);
    });


    it("should return the correct order on -> GET /orders/:id", async () => {
        const response = await request.get("/orders/2");
        expect(response.body.status).toEqual('current');
    });
    
    it("should add product to an order on -> POST /orders/:id/products", async () => {
        const response = await request.post("/orders/2/products").send({
            quantity :3,
            product_id:2,
            order_id:2
         }).set("Accept", "application/json").set("Authorization", `Bearer ${OrderToken}`);
       
        expect(response.body.quantity).toEqual(3);
    });

    
    afterAll(async () => {
        await order.delete('2');
        const result = await UserStore.delete('2');
        await ProductStore.delete('2');
      
    });

});