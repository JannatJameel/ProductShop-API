const express = require("express");
const app = express();
const db = require("./db/models");
const cors = require("cors");
const ProductRoutes = require("./routes/products");

// MIDDLEWARE
app.use(express.json());
app.use(cors());

// ROUTES
app.use(ProductRoutes);

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