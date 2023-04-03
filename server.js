const express = require("express");
const path = require("path");
const logger = require("morgan");
require("dotenv").config();
require("./config/database");
// const jwt = require("jsonwebtoken");

const productRouter = require("./routes/products");
const locationRouter = require("./routes/locations");

const app = express();
const port = process.env.PORT || 3000;

app.use(logger("dev"));
// app.use(express.urlencoded());
app.use(express.json());
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api", productRouter);
app.use("/api/locations", locationRouter);

// log in for future admin roles!

// const isLoggedIn = (req, res, next) => {
//   const authorization = req.headers.authorization;
//   const token = authorization.split(" ")[1];
//   const decode = jwt.verify(token, process.env.JWT_SECRET);
//   if (decode) {
//     res.locals.user = decode.user;
//     next();
//   } else {
//     res.status(403).json({ message: "sorry" });
//   }
// };

// app.get("/api/secret", isLoggedIn, (req, res) => {
//   console.log(res.locals.user);
//   res.json({ message: "secret" });
// });

// app.use("/api/users", userRouter);

// app.post("/api/users", (req, res) => {
//   res.json({ body: req.body });
// });

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
