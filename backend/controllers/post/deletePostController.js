const { getPostById, deletePost } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const deletePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.user;

    const post = await getPostById(parseInt(postId));

    if (!post) {
      return errorResponse(res, "Post not found", 404);
    }

    if (post.author_id !== parseInt(userId)) {
      return errorResponse(
        res,
        "You do not have permission to delete this post",
        403
      );
    }

    await deletePost(parseInt(postId));

    successResponse(res, null, "Post deleted successfully");
  } catch (err) {
    console.log(err);
    errorResponse(res, "Failed to delete post", 500);
  }
};

module.exports = deletePostController;
