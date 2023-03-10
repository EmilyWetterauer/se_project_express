const ERROR_CODE_400 = {
  status: 400,
  message: "invalid data",
};

const ERROR_CODE_404 = {
  status: 404,
  message: "non-existant address",
};

const ERROR_CODE_500 = {
  status: 500,
  message: "An error has occurred on the server.",
};


module.exports = { ERROR_CODE_500, ERROR_CODE_400, ERROR_CODE_404 };
