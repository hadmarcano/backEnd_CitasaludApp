exports.userSignupValidator = (req, res, next) => {
  
  req.check("firstName", "First name is required").notEmpty();
  req.check("lastName", "Last name is required").notEmpty();
  req
    .check("email", "Email must be between 4 to 32 characters")
    .matches(/.+\@..+/)
    .withMessage("Email must contain @")
    .isLength({
      min: 4,
      max: 32,
    });
  req.check("password", "password is required").notEmpty();
  req
    .check("password")
    .isLength({ min: 6 })
    .withMessage("password must be contain at least 6 characters")
    .matches(/\d/)
    .withMessage("password must be contain a number");
  req
    .check("rut", "Rut is required")
    .notEmpty()
    .isNumeric()
    .withMessage("Rut without (-) ");
  req.check("phone", "Phone is required").notEmpty().isNumeric();
  req.check("address", "Address is required").notEmpty();
  
  const errors = req.validationErrors();
  console.log(errors);
  if (errors) {
    const firstError = errors.map((error) => error.msg)[0];
    return res.status(400).json({ Error: firstError });
  }
  next();
};
