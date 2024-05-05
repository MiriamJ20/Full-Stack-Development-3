const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema(
	{
    first_name: {
        type: String,
        trim: true,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        required: true
    },
    email: { 
        type: String,
        trim: true,
        required: true,
        // unique: true
    },
    password: {
        type: String,
        trim:true,
        required: true

    },
    auth_level:{
        type: String,
        trim:true,
        enum:['basic', 'admin'],
        default: 'basic'
        },
    },{timestamps: true}

)

module.exports = mongoose.model( "login", loginSchema );