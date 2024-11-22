const AsyncRouter = require("express-async-router").AsyncRouter;

const createCommentController = require("../controllers/comment/createCommentController");
const updateCommentController = require("../controllers/comment/updateCommentController");
const deleteCommentController = require("../controllers/comment/deleteCommentController");

const { validateComment } = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");

const commentRouter = AsyncRouter();

commentRouter.post(
  "/api/posts/:postId/comments",
  authenticate,
  validateComment,
  createCommentController
);

commentRouter.put(
  "/api/posts/:postId/comments/:commentId",
  authenticate,
  validateComment,
  updateCommentController
);

commentRouter.delete(
  "/api/posts/:postId/comments/:commentId",
  authenticate,
  deleteCommentController
);

module.exports = commentRouter;
