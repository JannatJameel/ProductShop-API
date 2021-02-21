const express = require("express");
const app = express();
const db = require("./db/models");
const cors = require("cors");
const passport = require("passport");
const ProductRoutes = require("./routes/products");
const ShopRoutes = require("./routes/shops");
const userRoutes = require("./routes/users");
const { localStrategy } = require("./middleware/passport");
const path = require("path");

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// PASSPORT
app.use(passport.initialize());
passport.use(localStrategy);

// ROUTES
app.use("/products", ProductRoutes);
app.use("/shops", ShopRoutes);
app.use(userRoutes);
app.use("/media", express.static(path.join(__dirname, "media")));


app.use((req, res, next) => {
  next({
    status: 404,
    message: "Path not found"
  })
});

app.use((err, req, res, next) => {
  res
    .status(err.status ?? 500)
    .json( {message: err.message ?? "Internal server error"} )
});

const run = async () => {
  try {
    await db.sequelize.sync();
    // await db.sequelize.sync({alter: true});
    // await db.sequelize.sync({force: true});
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(8000, () => {
    console.log("The application is running on localhost:8000");
  });
};

run();