const jwt = require("jsonwebtoken");
const jwt_Secrat = "HiteshdineshMali";

function Verification(req, res, next) {
  let data = req.headers.authorization;
  if (!data || !data.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Data not found",
    });
  }
  let token = data.split(" ")[1];
  let verify = jwt.verify(token, jwt_Secrat);
  if (!verify.User_id) {
    return res.send("User not verified");
  } else {
    req.id = verify.User_id;
    next();
  }
}

module.exports = Verification;
