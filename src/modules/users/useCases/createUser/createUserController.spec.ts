import request from "supertest";
import { app } from "../../../../app";





describe("Create a user controller", () => {

  it("should be able to create a user", async () => {
    const response = await request(app).post("/api/v1/users").send({
      name: "luan",
      email: "luanfreitas21@hotmail.com",
      password: "teste",
    });
    


    expect(response.status).toBe(201);
  });


})
