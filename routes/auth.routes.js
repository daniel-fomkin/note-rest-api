const { Router } = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { registerController } = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/register", asyncHandler(registerController));

module.exports = router