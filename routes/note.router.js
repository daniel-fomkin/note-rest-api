const express = require("express");
const { createController, deleteController, updateController, readController } = require("../controllers/note.controller");
const asyncHandler = require("../middleware/asyncHandler");
const authHandler = require("../middleware/authHandler");

const router = express.Router();

router.use(authHandler);

router.post("/note", asyncHandler(createController));
router.delete("/note", asyncHandler(deleteController));
router.patch("/note", asyncHandler(updateController));
router.get("/note/:userId", asyncHandler(readController));

module.exports = router;