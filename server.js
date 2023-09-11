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

// Set up port
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}
app.listen(port, err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Listening to port: ${port}`);
  }
});

// Set up database
const db = knex({
  client: "pg",
  connection: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

// Middlewares
app.use(express.json());
app.use(cors());

// Testing
app.get("/", (req, res) => {
  res.json("GET success");
});

// Endpoints
app.post("/signIn", signIn.handleSignIn(bcrypt, db));

app.post("/register", register.handleRegister(bcrypt, db));

app.post("/clarifaiApi", clarifaiApi.makeApiCall);

app.put("/imageSubmit", imageSubmit.handleImageSubmit(db));
