const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const router = require("./routes/routes.js");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", router);

const port = process.env.PORT || 8000;

const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json({ Error: "You are not authenticated" });
  } else {
    jwt.verify(token, "jwtkey", (err, decoded) => {
      if (err) {
        res.clearCookie("access_token");
        return res.json({ Error: "Invalid Token" });
      } else {
        req.email = decoded.email;
        next();
      }
    });
  }
};

app.get("/", verifyUser, (req, res) => {
  // console.log(req.email);
  return res.json({ status: 1, Success: "Authenticated", email: req.email });
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
