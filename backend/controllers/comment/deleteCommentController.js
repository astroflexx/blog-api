const { getCommentById, deleteComment } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const deleteCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId } = req.user;

    const comment = await getCommentById(parseInt(commentId));

    if (!comment) {
      return errorResponse(res, "Comment not found", 404);
    }

    if (comment.author_id !== parseInt(userId)) {
      return errorResponse(
        res,
        "You do not have permission to delete this comment",
        403
      );
    }

    await deleteComment(parseInt(commentId));

    successResponse(res, null, "Comment deleted successfully");
  } catch (err) {
    errorResponse(res, "Failed to delete comment", 500);
  }
};

module.exports = deleteCommentController;
