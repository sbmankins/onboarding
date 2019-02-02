const express = require("express");
const mongoose = require("mongoose");
const PORT = 5000;

mongoose.connect(
  "mongodb://localhost:27017/onboardingDB",
  { useNewUrlParser: true },
  () => console.log("Mongodb connected on port 27017")
);

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to oboarding app");
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}!`));
