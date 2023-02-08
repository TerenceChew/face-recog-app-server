const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const knex = require("knex");

// Controllers
const clarifaiApi = require("./controllers/clarifaiApi");
const signIn = require("./controllers/signIn");
const register = require("./controllers/register");
const imageSubmit = require("./controllers/imageSubmit");

const app = express();
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// Middleware
app.use(express.json());
app.use(cors());

// Testing
app.get("/", (req, res) => {
  res.json("GET success");
});

// Endpoints listed as below

// /signIn
app.post("/signIn", signIn.handleSignIn(bcrypt, db));

// /register
app.post("/register", register.handleRegister(bcrypt, db));

// /clarifaiApi
app.post("/clarifaiApi", clarifaiApi.makeApiCall);

// /imageSubmit
app.put("/imageSubmit", imageSubmit.handleImageSubmit(db));

// Port setups
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}
app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening to port: ${port}`);
  }
});
