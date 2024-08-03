const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const jwt_Secrat = "HiteshdineshMali";
const UserValidation = require("../Validation/UserValidation");
const { User } = require("../DataBase/Schema");
const SigninValidation = require("../Validation/Signin");
const Verification = require("../Middleware.js/Verification");
const UpdateValidation = require("../Validation/Update");
const router = express.Router();

// sign up
router.post("/signup", function (req, res) {
  let { name, email, age, nationality, password } = req.body;
  let Validation = UserValidation.safeParse(req.body);
  if (Validation.success == false) {
    return res.send("U enter wrong input");
  }
  bcrypt.genSalt(12, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let Entry = new User({
        name,
        email,
        age,
        nationality,
        password: hash,
      });
      await Entry.save();

      // token generate
      const User_id = Entry._id;
      let token = jwt.sign({ User_id }, jwt_Secrat);
      res.json({
        token: token,
        Entry,
      });
    });
  });
});

// sign in
router.post("/signin", async function (req, res) {
  let { email, password } = req.body;
  let Validation_2 = SigninValidation.safeParse(req.body);
  if (Validation_2.success === false) {
    return res.json({
      Message: "wrong input",
    });
  }
  let SigninUser = await User.findOne({ email });
  if (!SigninUser) {
    return res.send("User not exist");
  }
  let hash = SigninUser.password;
  let user_id = SigninUser._id;
  bcrypt.compare(password, hash, function (err, result) {
    if (result === true) {
      let token = jwt.sign({ user_id }, jwt_Secrat);
      res.json({
        token,
      });
    }
  });
});

// update route
router.put("/update", Verification, (req, res) => {
  let { name, email, password } = req.body;
  let Validation = UpdateValidation.safeParse(req.body);
  if (Validation.success === false) {
    return res.send("Input not verified");
  }
  // password hassing
  bcrypt.genSalt(12, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      let update_user = await User.findByIdAndUpdate(
        { _id: req.id },
        { name, email, password: hash },
        { new: true },
      );
      res.json(update_user);
    });
  });
});

// delete route
router.delete("/delete", Verification, async (req, res) => {
  let deleteAccount = await User.findByIdAndDelete({ _id: req.id });
  res.json({
    deleteAccount,
    message: "Account successfully deleted",
  });
});

module.exports = router;
