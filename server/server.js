const express = require("express");

const dotenv = require("dotenv").config();
const app = express();
const port = process.env.PORT || 5000;
const goalRoutes = require("./routes/goalRoutes");
require("./Database/db");

//
app.use(express.json());
app.use(goalRoutes);

app.listen(port, () => {
  console.log(`Server on port ${port}`);
});
