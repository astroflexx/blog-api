const AsyncRouter = require("express-async-router").AsyncRouter;

const authController = require("../controllers/authController");

const authRouter = AsyncRouter();

authRouter.post("/api/auth/validate", authController);

module.exports = authRouter;
