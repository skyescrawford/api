// PACKAGE or LIBRARY
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const cors = require("cors");

// ROUTES
const userRoutes = require("./routes/users");

app.set("views", path.join(__dirname, "/views"));

app.set("view engine", "ejs");

mongoose
  .connect("mongodb://localhost:27017/rest", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("CONNECTED TO MONGOO DB");
  })
  .catch((err) => {
    console.log("OH NO SOMETHING WENT WRONG");
    console.log(err);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.render("home");
});
app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`LISTENING ON PORT: ${PORT}`);
});
