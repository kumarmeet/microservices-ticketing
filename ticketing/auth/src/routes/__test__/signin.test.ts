import request from "supertest";
import { app } from "../../app";

describe("signin route", () => {
  it("fails when a email that does not exist is supplied", async () => {
    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  it("fails when a incorrect password that does not exist is supplied", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "werwe",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  it("sets a cookie after successful signin", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const response = await request(app)
      .post("/api/users/signin")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);

    expect(response.get("Set-Cookie")).toBeDefined();
  });
});
