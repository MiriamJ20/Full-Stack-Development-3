import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// This section will help you get a list of all the agents.
router.get("/", async (req, res) => {
	let collection = await db.collection("agents");
	let results = await collection.find({}).toArray();
	res.send(results).status(200);
});

// This section will help you get a single agent by id.
router.get("/:id", async (req, res) => {
  let collection = await db.collection("agents");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new agent.
router.post("/", async (req, res) => {
	let newAgent = {
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		region: req.body.region,
		rating: req.body.rating,
		fee: req.body.fee,
	};
	let collection = await db.collection("agents");
	let result = await collection.insertOne(newAgent);
	res.send(result).status(204);
});

// This section will help you update a agent by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates = {
		$set: {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			region: req.body.region,
			rating: req.body.rating,
			fee: req.body.fee,
		},
	};

  let collection = await db.collection("agents");
  let result = await collection.updateOne(query, updates);
  res.send(result).status(200);
});

// This section will help you delete a agent.
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("agents");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;