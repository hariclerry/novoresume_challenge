const { body } = require("express-validator");

exports.validate = (method) => {
  switch (method) {
    case "registerUserValidator": {
      return [
        body("firstName", `First name is required`).exists().trim(),
        body("lastName", "Last name is required").exists().trim(),
        body("email", "Email is required and should be valid")
          .isEmail()
          .exists()
          .trim()
          .isLength({ min: 5 }),
        body(
          "password",
          `Password is required and should have atleast 5 characters`
        )
          .exists()
          .trim()
          .isLength({ min: 5 }),
      ];
    }
    case "loginUserValidator": {
      return [
        body("email", "Email is required and should be valid")
          .isEmail()
          .exists()
          .trim()
          .isLength({ min: 5 }),
        body(
          "password",
          `Password is required and should have atleast 5 characters`
        )
          .exists()
          .trim()
          .isLength({ min: 5 }),
      ];
    }
    default:
      return null;
  }
};
