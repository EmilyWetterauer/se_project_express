const errorHandler = (err, req, res) => {
  res
    .status(err.statusCode || 500)
    .send({ message: err.message || "something went wrong" });
};

module.exports = {
  errorHandler,
};
