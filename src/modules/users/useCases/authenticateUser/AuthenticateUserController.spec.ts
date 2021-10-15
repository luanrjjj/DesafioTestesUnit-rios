import request from "supertest";
import { app } from "../../../../app";
import {AuthenticateUserController} from './AuthenticateUserController';



let authenticateUser: AuthenticateUserController;



describe("Create a Authenticate user controller", () => {
 
  beforeEach(()=> {
      authenticateUser = new AuthenticateUserController()
  })


  it("should be able to create a session", async () => {
      await request(app).post("/api/v1/users").send({
      name:"teste",
      email: "teste@hotmail.com",
      password: "teste",
    });

    const responseToken = await request(app).post("/api/v1/sessions").send({
        email: "teste@hotmail.com",
        password: "teste",
      });
  

    expect(responseToken.status).toBe(200)
  });

  it("should  not be able to create a session", async () => {
    await request(app).post("/api/v1/users").send({
    name:"teste",
    email: "teste@hotmail.com",
    password: "teste",
  });

  const responseToken = await request(app).post("/api/v1/sessions").send({
      email: "teste@hotmail.com",
      password: "teste10",
    });


  expect(responseToken.status).toBe(401)
});


})
