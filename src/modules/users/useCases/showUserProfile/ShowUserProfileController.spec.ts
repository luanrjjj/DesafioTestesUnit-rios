import request from "supertest";
import { app } from "../../../../app";
import { User } from "../../entities/User";
import {AuthenticateUserController} from '../authenticateUser/AuthenticateUserController';



let authenticateUser: AuthenticateUserController;



describe("Show the profile", () => {
 
  beforeEach(()=> {
    authenticateUser = new AuthenticateUserController()
})


it("should be able to show the profile", async () => {
    await request(app).post("/api/v1/users").send({
    name:"teste",
    email: "teste@hotmail.com",
    password: "teste",
  });

  const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "teste@hotmail.com",
      password: "teste",
    });
  
  const { token } = responseToken.body

  const user:any= await request(app).post("/api/v1/profile").send({
    token:token
});

expect(user)
})
})