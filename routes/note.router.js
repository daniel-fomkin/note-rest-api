const express = require("express");
const { createController, deleteController } = require("../controllers/note.controller");

const router = express.Router();


router.post("/note", createController);
router.delete("/note", deleteController);

module.exports = router;