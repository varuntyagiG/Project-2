const express = require("express");
const mainRouter = require("./Routes/basicRoute");
const app = express();

app.use(express.json());

app.use("/ec/s1", mainRouter);

app.listen(9000, function (req, res) {
  console.log(`Server listening along the port ${9000}`);
});
