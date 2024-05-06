const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
	session_id: {
		type: String,
		trim: true,
		required: true,
	},
	session_date: {
		type: Date,
		trim: true,
		required: true,
	},
	user_id: {
		type: String,
		trim: true,
		required: true,
		// unique: true
	},
});
module.exports = mongoose.model("session", sessionSchema);
