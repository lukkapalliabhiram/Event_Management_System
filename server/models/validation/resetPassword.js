const Validator = require("validator");
const isEmpty = require("is-empty");
module.exports = function validateResetPasswordInput(data) {
  console.log("data:");
  let errors = {};// Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.new_password = !isEmpty(data.new_password) ? data.new_password : "";
  data.new_password2 = !isEmpty(data.new_password2) ? data.new_password2 : "";// Name checks
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.message = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.message = "Email is invalid";
  }// Password checks
  if (Validator.isEmpty(data.new_password)) {
    errors.message = "Password field is required";
  }if (Validator.isEmpty(data.new_password2)) {
    errors.message = "Confirm password field is required";
  }if (data.new_password.length < 8) {
    errors.message = "Password must be at least 8 characters";
  }if (!Validator.equals(data.new_password, data.new_password2)) {
    errors.message = "Passwords must match";
  }return {
    errors,
    isValid: isEmpty(errors)
  };
};