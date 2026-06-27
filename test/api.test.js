const request = require("supertest");
const app = require("../src/server");

describe("AWS QA Cloud Native API", () => {
  test("GET / should return app status", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
  });

  test("GET /health should return healthy", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("healthy");
  });

  test("GET /students should return students", async () => {
    const response = await request(app).get("/students");

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /students should create student", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        name: "María",
        course: "Automatización QA"
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.name).toBe("María");
  });

  test("POST /students should validate required fields", async () => {
    const response = await request(app)
      .post("/students")
      .send({
        name: "Sin curso"
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe("name and course are required");
  });
});