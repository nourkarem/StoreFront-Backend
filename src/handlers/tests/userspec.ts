import supertest from "supertest";
import app from "../../server";
import {user,userStore} from "../../models/user"
const user= new userStore();
describe("user endpoint test for the storefront API", () => {
    const request = supertest(app);
    let token : string;

    afterAll(async () => {
        const result = await user.delete("4");

        expect(result).toEqual({
          id :4,
          firstname :"nour",
          lastname :"karem"
         
        });
         
        
      
    });

    it("should create a new user on -> POST /users", async () => {
        const response = await request.post("/users").send({
            firstName: "nour",
            lastName: "karem",
            password: "password123",
        }).set("Accept", "application/json");
        expect(response.status).toBe(200);
        token = response.body;
    });

    it("should return a list of all users on -> GET /users", async () => {
        const response = await request.get("/users").set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it("should return the correct user on -> GET /users/:id", async () => {
        const response = await request.get("/users/4").set("Authorization", `Bearer ${token}`);
        expect(response.body.firstname).toEqual("nour");
    });

 

});