const { body, validationResult } = require('express-validator')

const RegisterValidator = [
  body('email')
    .isEmail().withMessage('Invalid Email').bail().isLength({ min: 10 }).withMessage("Email must be atleast 8 characters long").bail(),
  body('username').isLength({ min: 3 }).withMessage('Invalid Username').bail(),
  body('password').isLength({ min: 8 }).withMessage('Weak Password').bail()
]

function validate(req, res, next) {
  try {
    const error = validationResult(req)
    if (!error.isEmpty()) { return res.status(400).json({ success: false, errors: error.array() }) }
    next()
  } catch (error) {
    return res.status(500).json({
      message: 'Internal Server Error'
    })
  }
}

const LoginValidator = [
  body('email').isEmail().withMessage('Invalid Email').bail().isLength({ min: 10 }).withMessage('Invalid Email').bail(),
  body('password').isLength({ min: 8 }).withMessage('Password must be atleast 8 chars long')
]

const productValidation = [
  body("title")
    .notEmpty().withMessage("Title is required")
    .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
  body("description")
    .notEmpty().withMessage("Description is required")
    .isLength({ min: 10 }).withMessage("Description must be at least 10 characters"),
  body("price")
    .notEmpty().withMessage("Price is required")
    .isFloat({ gt: 0 }).withMessage("Price must be greater than 0"),
  body("stock")
    .notEmpty().withMessage("stock is required")
    .isFloat({ gt: 0 }).withMessage("stock must be greater than 0"),
  body("discount")
    .optional()
    .isFloat({ min: 0, max: 100 })
    .withMessage("Discount must be between 0 and 100"),
];

const OrderValidator = [
  body("paymentOption")
    .notEmpty()
    .withMessage("Payment option is required")
    .isIn(["COD", "ONLINE"])
    .withMessage("Payment option must be COD or ONLINE"),

  body("fullName").notEmpty().withMessage("Full name is required"),

  body("state").notEmpty().withMessage("State is required"),

  body("city").notEmpty().withMessage("City is required"),

  body("street").notEmpty().withMessage("Street address is required"),

  body("phoneNumber")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone("en-IN")
    .withMessage("Invalid phone number format"),

  body("paymentStatus")
    .notEmpty()
    .withMessage("Payment status is required")
    .isIn(["paid", "pending", "failed"])
    .withMessage("Payment status must be paid, pending, or failed"),
]

  module.exports = {
    RegisterValidator,
    validate,
    LoginValidator,
    productValidation,
    OrderValidator
  }