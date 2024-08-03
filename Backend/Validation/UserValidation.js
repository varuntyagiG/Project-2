const zod = require("zod");

const UserValidation = zod.object({
  name: zod.string().min(3).max(15),
  email: zod.string().email(),
  age: zod.number().gt(18).lt(60),
  nationality: zod.string(),
  password: zod.string(),
});

module.exports = UserValidation;
