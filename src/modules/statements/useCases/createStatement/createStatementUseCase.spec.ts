import request from "supertest";
import { DriverPackageNotInstalledError } from "typeorm";
import { app } from "../../../../app";
import { AuthenticateUserController } from "../../../users/useCases/authenticateUser/AuthenticateUserController";

let authenticateUser: AuthenticateUserController;

describe("Create a Statement",()=> {
    beforeEach(()=> {
        authenticateUser = new AuthenticateUserController()
    })

    it("should be able to create a  deposit statement", async () => {
        await request(app).post("/api/v1/users").send({
            name:"teste",
            email: "teste@hotmail.com",
            password: "teste",
    })
    const responseToken = await request(app).post("/api/v1/sessions").send({
        email: "teste@hotmail.com",
        password: "teste",
      });
      const { token } = responseToken.body

      
    

    const response = await request(app).post("/api/v1/statements/deposit").send({
       amount:200.00,
       description:'deposit for dog'
    }).set({Authorization: `Bearer ${token}`});

    
    expect(response.status).toBe(201);

    
    

})

it ("should be able to create a withdraw statement",async ()=> {
    await request(app).post("/api/v1/users").send({
        name:"teste",
        email: "teste@hotmail.com",
        password: "teste",
})
const responseToken = await request(app).post("/api/v1/sessions").send({
    email: "teste@hotmail.com",
    password: "teste",
  });
  const { token } = responseToken.body

  const deposit = await request(app).post("/api/v1/statements/deposit").send({
    amount:200.00,
    description:'deposit for dog'
 }).set({Authorization: `Bearer ${token}`});

  const response = await (request(app).post("/api/v1/statements/withdraw")).send({
      amount:199.00,
      description:'salary of month'
  }).set({Authorization: `Bearer ${token}`});

  expect(response.status).toBe(201);
})

it ("should be not able to create a withdraw statement",async ()=> {
    await request(app).post("/api/v1/users").send({
        name:"teste",
        email: "teste@hotmail.com",
        password: "teste",
})
const responseToken = await request(app).post("/api/v1/sessions").send({
    email: "teste@hotmail.com",
    password: "teste",
  });
  const { token } = responseToken.body

  const deposit = await request(app).post("/api/v1/statements/deposit").send({
    amount:200.00,
    description:'deposit for dog'
 }).set({Authorization: `Bearer ${token}`});

  const response = await (request(app).post("/api/v1/statements/withdraw")).send({
      amount:300.00,
      description:'salary of month'
  }).set({Authorization: `Bearer ${token}`});
  
  expect(response.status).toBe(201);
})

})