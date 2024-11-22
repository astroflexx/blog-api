const { getPostById, updatePost} = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const updatePostController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { title, content, published } = req.body;
    const { userId } = req.user;

    const post = await getPostById(parseInt(postId));

    if (!post) {
      return errorResponse(res, "Post not found", 404);
    }

    if (post.author_id !== parseInt(userId)) {
      return errorResponse(
        res,
        "You do not have permission to edit this post",
        403
      );
    }

    const updatedPost = await updatePost(parseInt(postId), title, content, Boolean(published));
    successResponse(res, updatedPost, "Post updated successfully");
  } catch (err) {
    errorResponse(res, "Failed to update post", 500);
  }
};

module.exports = updatePostController;
