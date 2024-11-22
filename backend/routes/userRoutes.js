const AsyncRouter = require("express-async-router").AsyncRouter;

const signup = require("../controllers/user/signup");
const login = require("../controllers/user/login");
const logout = require("../controllers/user/logout");

const { validateUserSignup } = require("../middleware/validate");

const authenticate = require("../middleware/authenticate");

const userRouter = AsyncRouter();

userRouter.post("/api/signup", validateUserSignup, signup);
userRouter.post("/api/login", login);
userRouter.post("/api/logout", authenticate, logout);

module.exports = userRouter;
