const path = require("path");
const express = require("express");

const dotenv = require("dotenv").config({ path: "c.env" });
require("./Database/db");

const port = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/goals", require("./appRoutes/goalRoutes"));
app.use("/api/users", require("./appRoutes/userRoutes"));
app.listen(port, () => console.log(`Server started on port ${port}`));
