const express = require("express");
const app = express();
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const movieRoute = require("./routes/movie");
const PORT = 8080;
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to Database
mongoose
  .connect(process.env.MONGOURL)
  .then(() => {
    console.log("Connecting to DB");
  })
  .catch((err) => {
    console.log(err);
  });

// middle ware
app.use(express.json());
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/movie", movieRoute);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});
