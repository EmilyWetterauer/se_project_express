const express = require("express");

const mongoose = require("mongoose");

const { errors } = require("celebrate");

require("dotenv").config();

const app = express();
const cors = require("cors");

const { errorHandler } = require("./middlewares/errorHandler");

app.use(cors());
const { requestLogger, errorLogger } = require("./middlewares/logger");

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

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});

app.use(routes);

app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

const { PORT = 3001 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
