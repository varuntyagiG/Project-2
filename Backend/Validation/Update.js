const zod = require("zod");

const UpdateValidation = zod.object({
  email: zod.string().email(),
  password: zod.string().min(3).max(15),
});

module.exports = UpdateValidation;
