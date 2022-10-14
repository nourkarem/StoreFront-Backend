import supertest from "supertest";
import app from "../../server";
import jwt, { Secret } from "jsonwebtoken";
import { user,userStore } from "../../models/user";
import { productStore } from "../../models/product";


const UserStore = new userStore();
const product   = new productStore();

describe("products spec endpoint test for the storefront API", () => {
    const request = supertest(app);
    let productToken : string;
 

    beforeAll(async () => {
        const response = await request.post("/users").send({
            firstName: "nour",
            lastName: "karem",
            password: "password123",
        }).set("Accept", "application/json");
        expect(response.status).toBe(200);
        productToken  = response.body;
      
    });

    it("should create a new product on -> POST /products", async () => {
        const response = await request.post("/products").send({
           name :"product1test",
            price:40  
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