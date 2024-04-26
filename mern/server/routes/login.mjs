import express from "express";
import db from "../db/conn.js";

const router = express.Router();
// Login Endpoint
router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	const login = await db.collection("logins").findOne({ email, password });

	if (!login) {
		res.status(401).send("Unauthorized");
	} else {
		res.status(200).send("Success");
	}
});
// Register endpoint
router.post("/register", async (req, res) => {
    const { first_name, last_name, email, password } = req.body;
    const existingUser = await db.collection("logins").findOne({ email, password });

    if (existingUser) {
        res.status(400).send("User already exists");
    } else {
        const newUser = { first_name, last_name, email, password };
        await db.collection("logins").insertOne(newUser);
        res.status(201).send("User created successfully");
    }
});

export default router;
