//require("dotenv").config(); //Load ENV variables
const express = require("express");
const morgan = require("morgan") //import morgan
//const methodOverride = require("method-override")
const mongoose = require("mongoose")

// DATABASE CONNECTION
const DATABASE_URL = process.env.DATABASE_URL;
const CONFIG = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

// Connect
mongoose.connect(DATABASE_URL, CONFIG)

// Models
const {Schema, model} = mongoose;

// Schema
const todoSchema = new Schema({
    text: String
})

// Make fruit model
const Todo = model("Todo", todoSchema);

const app = express();
