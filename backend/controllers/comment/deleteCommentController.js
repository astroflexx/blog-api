const { getCommentById, deleteCommentById } = require("../db/queries");
const { successResponse, errorResponse } = require("../utils/response");

const deleteCommentController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { userId } = req.user;

    const comment = await getCommentById(commentId);

    if (!comment) {
      return errorResponse(res, "Comment not found", 404);
    }

    if (comment.author_id !== userId) {
      return errorResponse(
        res,
        "You do not have permission to delete this comment",
        403
      );
    }

    await deleteCommentById(commentId);

    successResponse(res, null, "Comment deleted successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to delete comment", 500);
  }
};

module.exports = deleteCommentController;
