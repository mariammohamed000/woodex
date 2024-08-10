require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const { connectToMongoDB } = require("./config/mongo");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const app = express();
app.use(cors());
const port = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "uploads")));

connectToMongoDB();

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.CONNECTION_STRING,
      collectionName: "sessions",
    }),
    cookie: { maxAge: 180 * 60 * 1000 }, // 3 hours
  })
);

// Import routes
const indexRouter = require("./routes/index");
app.use("/", indexRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
