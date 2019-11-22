const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const verify = require("./auth/verifyToken.js");
const cors = require("cors");
require("dotenv").config();

//DB connection
mongoose
  .connect(process.env.DB_CONNECT, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("connected to DB"))
  .catch(error => console.log("Db connection error", error));

//Body parser
app.use(bodyParser.json());

//Cors allow
app.use(cors());

//Route
app.use("/api/", users);
app.use("/api/", posts);
app.use("/api/auth", verify, (req, res) => {
  res.status(200);
});

app.listen(port, () => console.log(`server running on ${port}`));
