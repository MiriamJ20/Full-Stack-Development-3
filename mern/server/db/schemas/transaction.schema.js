const mongoose = require("mongoose");

const transactionsSchema = new mongoose.Schema(
	{
		amount: {
			type: Number,
			required: true,
			min: 0,
		},

		agent_id: {
			type: mongoose.Types.ObjectId,
			ref: "agent.Schema",
			required: true,
		},
		first_name: {
			type: mongoose.Types.ObjectId,
			ref: "agent.Schema",
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("transactions", transactionsSchema);
