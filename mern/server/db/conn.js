import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({path: './.env'});

const connectionString = process.env.ATLAS_URI;

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting to MongoDB Atlas...");
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("Full-Stack-Dev-2");

export default db;