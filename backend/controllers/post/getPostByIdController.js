const { getPostById } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const getPostByIdController = async (req, res) => {
  try {
    const { postId } = req.params;
    const post = await getPostById(parseInt(postId));

    if (!post) {
      return errorResponse(res, "Post not found", 404);
    }

    successResponse(res, post, "Post retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to fetch post", 500);
  }
};

module.exports = getPostByIdController;
