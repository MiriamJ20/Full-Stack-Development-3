import express from "express";
import db from "../db/conn.js";

const router = express.Router();   

router.get("/", async (req, res) => {
    res.status(500).send("Something went wrong");      
});

export default router;