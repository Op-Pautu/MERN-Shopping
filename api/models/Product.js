const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true, },
    img: { type: String, required: true },
    categories: { type: Array },
    size: { type: Array },
    color: { type: Array },
    price: { type: Number, required: true },
<<<<<<< HEAD
    inStock:{type: Boolean, default: true}    
=======
    inStock: { type: Boolean, default: true}
    
>>>>>>> b3892e0278ddf072237c275b2f27003d94c3df02
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);