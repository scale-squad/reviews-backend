// config/db.js
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db;
let collection;

async function connectDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db(dbName);
    collection = db.collection("reviews");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    throw err;
  }
}

function getDB() {
  if (!db) {
    throw new Error("Database not connected. Call connectDB first.");
  }
  return db;
}

function getCollection() {
  if (!collection) {
    throw new Error("Collection not initialized. Call connectDB first.");
  }
  return collection;
}

module.exports = { connectDB, getDB, getCollection };