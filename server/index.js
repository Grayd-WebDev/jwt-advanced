require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const { PORT, DB_URL } = process.env;

const app = express();

app.use(cors());
app.use(cookieParser());

const start = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
 
    app.listen(PORT, () => {
      console.log(`The server is working on port ${PORT}`);
    });
  } catch (e) {
    console.log("The Error happened in start of the server, it says -", e);
  }
};

start();
