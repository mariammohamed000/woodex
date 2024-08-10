const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  mobile: { type: String },
  address: { type: String },
  profilePicture: { type: String },
  isAdmin: { type: Boolean, default: false },
  wishList: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
  cart: {
    type: [
      {
        _id: false,
        item: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        quantity: Number,
      },
    ],
    ref: "Product",
    default: [],
  },
  orders: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Product",
    default: [],
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
