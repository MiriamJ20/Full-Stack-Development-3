import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import "./loadEnvironment.mjs";
import agents from "./routes/agents.mjs";
import logins from "./routes/login.mjs"
import error from "./routes/error.mjs";
// import transactions from "./routes/transaction.mjs";

const PORT = 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/agent", agents);
app.use("/login", logins);
app.use("/error", error);
// app.use("/transaction", transactions);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
