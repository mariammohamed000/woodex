const mongoose = require("mongoose");
function connectToMongoDB() {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err));
}
module.exports = { connectToMongoDB };
