const express = require("express");

const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const http = require("http");

// const server = http.createServer(() => {});

const app = express();

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const routes = require("./routes");

app.use(express.json());
app.use((req, res, next) => {
  console.log("req", req);
  req.user = {
    _id: "5d8b8592978f8bd833ca8133", // paste the _id of the test user created in the previous step
  };
  console.log("req user _id", req.user._id);
  next();
});
app.use(routes);

const { PORT = 3001 } = process.env;
app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
