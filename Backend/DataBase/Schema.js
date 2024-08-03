const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect(
    "mongodb+srv://Varun_Tyagi:varuntyagi@cluster0.eiochyn.mongodb.net/E-Commerce",
  )
  .then(() => console.log("Connected!"));

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    requires: true,
  },
  nationality: String,
  password: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = {
  User,
};
