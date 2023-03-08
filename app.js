const express = require("express");

const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const http = require("http");

// const server = http.createServer(() => {});

const app = express();

mongoose.connect("mongodb://localhost:27017/wtwr_db", (e) => {
  console.log("error", e);
  console.log("connect to db");
});

const routes = require("./routes");
app.use(express.json());
app.use((req, res, next) => {
  req.user = {
    _id: "63f2d1216e53dc52d0458ba5", // paste the _id of the test user created in the previous step
  };
  next();
});
app.use(routes);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
