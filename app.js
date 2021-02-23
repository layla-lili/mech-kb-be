const express = require("express");
const passport = require("passport");
const db = require("./db/models");

const productRoutes = require("./routes/products");
//const shopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");
const { localStrategy } = require("./middleware/passport");
const cors = require("cors");
const app = express();
const path = require("path");

app.use(express.json());
app.use(cors());

app.use(passport.initialize());
passport.use(localStrategy);

app.use("/products", productRoutes);

app.use(userRoutes); //"/users", usersRoutes its okay both correct
console.log("dir name", path.join(__dirname, "media"));
app.use("/media", express.static(path.join(__dirname, "media")));
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ message: err.message || "Internal Server Error" });
});

const PORT = 8000;
//db.sequelize.sync();
db.sequelize.sync({ alter: true });
//db.sequelize.sync({ force: true });
app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
