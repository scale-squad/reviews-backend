const request = require("supertest");
const express = require("express");
const reviewRoutes = require("../routes/reviewRoutes");
const { connectDB, client,getCollection } = require("../config/db");

const app = express();
app.use(express.json());
app.use("/", reviewRoutes);

beforeAll(async () => {
  await connectDB();
})
afterAll(async () => {
  await client.close();
});

describe("Review Routes", () => {
  it("should get review by ID", async () => {
    const response = await request(app).get("/reviews/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("review_id", 1);
  });


  it("should get reviews", async () => {
    const response = await request(app).get("/reviews?product_id=1&page=1&count=10&sort=newest");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("product", "1");
    expect(response.body.results).toBeInstanceOf(Array);
  });

  it("should get review metadata", async () => {
    const response = await request(app).get("/reviews/meta/1");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("product_id", 1);
  });

  it("should create a review", async () => {
    const newReview = {
      product_id: 1,
      rating: 5,
      summary: "Great product",
      body: "I really enjoyed this product.",
      recommend: true,
      reviewer_name: "John Doe",
      email: "john.doe@example.com",
      photos: [],
      characteristics: {},
    };
    const response = await request(app).post("/reviews").send(newReview);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("message", "Review added successfully");
  });

  it("should mark review as helpful", async () => {
    const response = await request(app).put("/reviews/1/helpful");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Review marked as helpful");
  });

  it("should report review", async () => {
    const response = await request(app).put("/reviews/1/report");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Review reported");
  });
});