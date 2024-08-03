const zod = require("zod");

const SigninValidation = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3).max(15),
});

module.exports = SigninValidation;
