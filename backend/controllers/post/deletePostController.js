const { getPostById, deletePostById } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await getPostById(postId);

    if (!post) {
      return errorResponse(res, "Post not found", 404);
    }

    if (post.author_id !== userId) {
      return errorResponse(
        res,
        "You do not have permission to delete this post",
        403
      );
    }

    await deletePostById(postId);

    successResponse(res, null, "Post deleted successfully");
  } catch (err) {
    errorResponse(res, "Failed to delete post", 500);
  }
};

module.exports = deletePostController;
