const express = require("express");
const noteRouter = require("./routes/note.router");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("It work, all good.");
});

app.use(("/api"), noteRouter);

module.exports = app;