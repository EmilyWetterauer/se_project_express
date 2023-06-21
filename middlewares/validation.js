const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// separate validateUrl function
const validateURL = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

module.exports.validateCardBody = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().required().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),

      imageUrl: Joi.string().required().custom(validateURL).messages({
        "string.empty": 'The "imageUrl" field must be filled in',
        "string.uri": 'the "imageUrl" field must be a valid url',
      }),
    })
    .unknown(true),
});

module.exports.validateUserInfoBody = celebrate({
  body: Joi.object()
    .keys({
      name: Joi.string().min(2).max(30).messages({
        "string.min": 'The minimum length of the "name" field is 2',
        "string.max": 'The maximum length of the "name" field is 30',
        "string.empty": 'The "name" field must be filled in',
      }),
      avatar: Joi.string().custom(validateURL).required().messages({
        "string.uri": 'the "avatarUrl" field must be a valid url',
      }),
      email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'The "email" field must be a valid email address',
      }),
      password: Joi.string()
        .required()
        .messages({ "string.empty": 'The "password" field must be filled in' }),
    })
    .unknown(true),
});

module.exports.validateUserAuthentication = celebrate({
  body: Joi.object()
    .keys({
      email: Joi.string().required().email().messages({
        "string.empty": 'The "email" field must be filled in',
        "string.email": 'The "email" field must be a valid email address',
      }),
      password: Joi.string()
        .required()
        .messages({ "string.empty": 'The "password" field must be filled in' }),
    })
    .unknown(true),
});

module.exports.validateId = celebrate({
  params: Joi.object()
    .keys({
      itemId: Joi.string().required().messages({
        "string.empty": 'The "itemId" parameter must be provided',
      }),
      userId: Joi.string().required(),
    })
    .unknown(true),
});

module.exports.validateUserId = celebrate({
  body: Joi.object()
    .keys({
      id: Joi.string().length(24).hex().required().messages({
        "string.empty": 'The "id" field must be filled in',
        "string.length":
          'The "id" field must be a hexadecimal value with a length of 24 characters',
        "string.hex": 'The "id" field must be a hexadecimal value',
      }),
    })
    .unknown(true),
});

module.exports.validateClothingItemId = celebrate({
  body: Joi.object()
    .keys({
      id: Joi.string().length(24).hex().required().messages({
        "string.empty": 'The "id" field must be filled in',
        "string.length":
          'The "id" field must be a hexadecimal value with a length of 24 characters',
        "string.hex": 'The "id" field must be a hexadecimal value',
      }),
    })
    .unknown(true),
});
