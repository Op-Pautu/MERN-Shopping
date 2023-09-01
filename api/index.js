const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MONGODB"))
  .catch((error) => console.log(error));



app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});