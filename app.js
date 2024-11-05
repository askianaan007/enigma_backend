const express = require("express");
const fetch = require("./routes/recipeRoutes.js");
const auth = require("./routes/user.js");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/", fetch);
app.use("/api/v1/", auth);

module.exports = app;
