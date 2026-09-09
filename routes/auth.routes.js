const { Router } = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { registerController, loginController } = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/register", asyncHandler(registerController));
router.post("/auth/login", asyncHandler(loginController));

module.exports = router