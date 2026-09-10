const { Router } = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const { registerController, loginController, refreshController, logoutController } = require("../controllers/auth.controller");

const router = Router();

router.post("/auth/register", asyncHandler(registerController));
router.post("/auth/login", asyncHandler(loginController));
router.post("/auth/refresh", asyncHandler(refreshController));
router.post("/auth/logout", asyncHandler(logoutController));

module.exports = router