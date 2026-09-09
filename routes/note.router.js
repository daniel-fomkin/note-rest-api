const express = require("express");
const { createController, deleteController, updateController } = require("../controllers/note.controller");

const router = express.Router();


router.post("/note", createController);
router.delete("/note", deleteController);
router.patch("/note", updateController);

module.exports = router;