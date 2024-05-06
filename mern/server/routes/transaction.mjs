const express = require("express");
const router = express.Router();
const Transaction = require("../db/schemas/transaction.schema");
const Agent = require("../db/schemas/agent.schema");

// GET /transaction-data endpoint to return last 10 transactions
router.get("/transaction-data", async (req, res) => {
	try {
		const transactions = await Transaction.find()
			.sort({ createdAt: -1 }) // Sort by createdAt in descending order
			.limit(10); // Limit to last 10 transactions
		res.json(transactions);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET /agent-data endpoint to return agents' data
router.get("/agent-data", async (req, res) => {
	try {
		const agents = await Agent.find({}, { first_name: 1, last_name: 1 });
		res.json(agents);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router;
