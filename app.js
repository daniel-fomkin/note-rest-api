const express = require("express");

const errorHandler = require("./middleware/errorHandler");

//Routers
const noteRouter = require("./routes/note.router");
const authRouter = require("./routes/auth.routes.js");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("It work, all good.");
});

app.use(("/api"), noteRouter, authRouter);
app.use(errorHandler);

module.exports = app;