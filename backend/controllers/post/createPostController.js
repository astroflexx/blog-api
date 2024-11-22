const { createPost } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const createPostController = async (req, res) => {
  try {
    const { title, content, published } = req.body;
    const { userId } = req.user;

    const newPost = await createPost(title, content, parseInt(userId));

    successResponse(res, newPost, "Post created successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to create post", 500);
  }
};

module.exports = createPostController;
