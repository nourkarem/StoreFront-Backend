import supertest from "supertest";
import app from "../../server";
import jwt, { Secret } from "jsonwebtoken";
import { order,orderproducts,orderStore } from "../../models/orders";
import { user,userStore } from "../../models/user";
import { product,productStore } from "../../models/product";

const UserStore = new userStore();
const ProductStore = new productStore();
const order = new orderStore();
describe("dashboard spec endpoint test for the storefront API", () => {
    const request = supertest(app);
    let Token : string;

    beforeAll(async () => {
        const responseUser= await request.post("/users").send({
            firstName: "nour",
            lastName: "karem",
            password: "password123",
        }).set("Accept", "application/json");
        expect(responseUser.status).toBe(200);
        Token  = responseUser.body;

        const responseProduct = await request.post("/products").send({
            name :"product1test",
             price:40  
         }).set("Accept", "application/json").set("Authorization", `Bearer ${Token}`);
         expect(responseProduct.body.price).toEqual(40);
    

         const responseorder = await request.post("/orders").send({
         user_id:1,
            status:'current'
        }).set("Accept", "application/json").set("Authorization", `Bearer ${Token}`);
        expect(responseorder.body.status).toEqual('current');
     
        const response = await request.post("/orders/1/products").send({
            quantity:3,
            product_id:1,
            order_id:1
        }).set("Accept", "application/json").set("Authorization", `Bearer ${Token}`);
       
      
        expect(response.body.quantity).toEqual(3);

    });

    it("should return user current order -> Get /usrOrders", async () => {
        const response = await request.get('/userOrders').send({
            
            user_id:1
           
        }).set("Accept", "application/json").set("Authorization", `Bearer ${Token}`);
        //order_id:number,user_id:number,status:string,products:producsQuantityInOrder[]
      
        expect(response.body.status).toEqual(
           "current"
    );
  
    });


  
    afterAll(async () => {
        try{
        await order.delete('1');
        await UserStore.delete('1');
        await ProductStore.delete('1');
        }
        catch(err)
        {
            console.log(`after testing function get user current order , error happened during delete order user product With ERRor:${err}  `)
        }
      
    });

});