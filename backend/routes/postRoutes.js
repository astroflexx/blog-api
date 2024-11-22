const AsyncRouter = require("express-async-router").AsyncRouter;

const createPostController = require("../controllers/post/createPostController");
const getPostByIdController = require("../controllers/post/getPostByIdController");
const getAllPostsController = require("../controllers/post/getAllPostsController");
const updatePostController = require("../controllers/post/updatePostController");
const deletePostController = require("../controllers/post/deletePostController");

const { validatePost } = require("../middleware/validate");
const authenticate = require("../middleware/authenticate");

const postRouter = AsyncRouter();

postRouter.get("/api/posts", getAllPostsController);
postRouter.get("/api/posts/:postId", getPostByIdController);
postRouter.post("/api/posts", authenticate, validatePost, createPostController);
postRouter.put("/api/posts/:postId", authenticate, validatePost, updatePostController);
postRouter.delete("/api/posts/:postId", authenticate, deletePostController);

module.exports = postRouter;
