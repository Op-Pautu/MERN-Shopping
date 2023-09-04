const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const dotenv = require("dotenv");
const userRoute = require('./routes/user')
const authRoute = require('./routes/auth')
const productRoute = require('./routes/product')
const cartRoute = require('./routes/cart')
const orderRoute = require('./routes/order')
const stripeRoute = require('./routes/stripe')
dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MONGODB"))
  .catch((error) => console.log(error));

app.use(cors());
app.use(express.json())  
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/products", productRoute)
app.use("/api/cart", cartRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)
app.listen(process.env.PORT || 5000, () => {
  console.log("Server running");
});
