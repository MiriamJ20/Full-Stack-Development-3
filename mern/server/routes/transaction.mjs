import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Route to get the last 10 transactions from the database
router.get("/transaction", async (req, res) => {
	try {
		const transactions = await db
			.collection("transactions")
			.find()
			.sort({ date: -1 })
			.limit(10)
			.toArray();
		res.json(transactions);
	} catch (error) {
		console.error("Error fetching transactions:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Route to get agents data from the database
router.get("/agent", async (req, res) => {
	try {
		const agents = await db.collection("agents").find().toArray();
		res.json(agents);
	} catch (error) {
		console.error("Error fetching agents:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

// Route to create a new transaction
router.post("/transaction", async (req, res) => {
  try {
    const newTransaction = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      amount: req.body.amount,
      date: req.body.date,
    };

    await db.collection("transactions").insertOne(newTransaction);
    res.json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
