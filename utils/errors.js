const ERROR_CODE_400 = {
  status: 400,
  message: "invalid data",
};

const ERROR_CODE_401 = {
  status: 401,
  message: "authorization required",
};

const ERROR_CODE_403 = {
  status: 403,
  message: "You are not authorized to delete this item",
};

const ERROR_CODE_404 = {
  status: 404,
  message: "There is no data with this id",
};

const ERROR_CODE_500 = {
  status: 500,
  message: "An error has occurred on the server.",
};

const ERROR_CODE_409 = {
  status: 409,
  message: "unique constraint violation.",
};

module.exports = {
  ERROR_CODE_500,
  ERROR_CODE_400,
  ERROR_CODE_401,
  ERROR_CODE_403,
  ERROR_CODE_404,
  ERROR_CODE_409,
};
