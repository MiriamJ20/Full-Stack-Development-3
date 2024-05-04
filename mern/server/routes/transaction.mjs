import express from "express";
import mongoose from "mongoose";
import db from "../db/conn.mjs";
// import transactionSchema from "../db/schemas/transactionSchema.js";

const router = express.Router();

// This section will help you create a new agent.
router.post("/", async (req, res) => {
	let newTransaction = {
		first_name: req.body.first_name,
        last_name: req.body.last_name,
        amount: req.body.amount,
		date: req.body.date,
	};
	let collection = await db.collection("transactions");
	let result = await collection.insertOne(newTransaction);
	res.send(result).status(204);
});

// This section will help you get a single transaction by id.
router.get("/:id", async (req, res) => {
  let collection = await db.collection("transaction");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;