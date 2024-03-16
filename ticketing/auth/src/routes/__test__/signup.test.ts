import request from "supertest";
import { app } from "../../app";

describe("signup route", () => {
  it("returns a 201 on successful signup", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });

  it("returns a 400 with a validation error for a request with an invalid email or password", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "notanemail",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);

    await request(app)
      .post("/api/users/signup")
      .send({
        password: "asdfas",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  it("returns a 400 with a validation error for a request with a password under 4 characters", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        password: "123",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  it("returns a 400 with a validation error for a request with a password over 20 characters", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password12345678901234567890",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });

  it("returns a 400 with a bad request error for a request with an existing email", async () => {
    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(201);

    await request(app)
      .post("/api/users/signup")
      .send({
        email: "test@test.com",
        password: "password123",
      })
      .expect(400)
      .expect("Content-Type", /application\/json/);
  });
});

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password123",
    })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(response.get("Set-Cookie")).toBeDefined();
});
