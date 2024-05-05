import express from "express";
import db from "../db/conn.mjs";
import transactionSchema from "../db/schemas/transaction.schema";

const router = express.Router();

// // Route to get the last 10 transactions from the database
// router.get("/transaction", async (req, res) => {
// 	try {
// 		const transactions = await db
// 			.collection("transactions")
// 			.find()
// 			.sort({ date: -1 })
// 			.limit(10)
// 			.toArray();
// 		res.json(transactions);
// 	} catch (error) {
// 		console.error("Error fetching transactions:", error);
// 		res.status(500).json({ error: "Internal server error" });
// 	}
// });

// // Route to create a new transaction
// router.post("/transaction", async (req, res) => {
//   try {
//     const newTransaction = {
//       first_name: req.body.first_name,
//       last_name: req.body.last_name,
//       amount: req.body.amount,
//       date: req.body.date,
//     };

// 	const result =  await db.collection("transactions").insertOne(newTransaction);
// 	console.log("Inserted document with _id:", result.insertedId);
//     res.json({ message: "Transaction created successfully" });
//   } catch (error) {
//     console.error("Error creating transaction:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// GET /transaction-data
router.get('/data', async (req, res) => {
   try {
  //   const transactions = await transactionSchema.find().sort({ createdAt: -1 }).limit(10);
    let collection = await db.collection("transactions");
    let result = await collection.find({}).toArray()
     
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
    console.log(error)
  }
});

// POST /transaction
router.post('/create', async (req, res) => {

  try {
    const transaction = await new transactionSchema(req.body);
    let collection = await db.collection("transactions");
    let result = await collection.insertOne(transaction);
    res.status(204).json({ msg: "Transaction created", data: result });
    // return(user)
  }
  catch {
    console.error()
    res.status(500).json({ msg: "creation error" })
  }

}
);

export default router;
