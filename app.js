const express = require("express");

const mongoose = require("mongoose");

require("dotenv").config();

const { errorHandler } = require("./middlewares/errorHandler");

const app = express();
const cors = require("cors");

app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error.message);
  });

const routes = require("./routes/index");

app.use(express.json());

app.use(routes);

app.use(errorHandler);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
