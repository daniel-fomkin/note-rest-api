const express = require("express");
const { createController } = require("../controllers/note.controller");

const router = express.Router();


router.post("/note", createController);

module.exports = router;