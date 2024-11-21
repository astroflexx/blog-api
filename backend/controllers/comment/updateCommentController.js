const { getCommentById, updateCommentById } = require("../db/queries");
const { successResponse, errorResponse } = require("../utils/response");

const updateCommentController = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const { content } = req.body;
    const { userId } = req.user;

    const comment = await getCommentById(commentId);

    if (!comment) {
      return errorResponse(res, "Comment not found", 404);
    }

    if (comment.author_id !== userId) {
      return errorResponse(
        res,
        "You do not have permission to edit this comment",
        403
      );
    }

    const updatedComment = await updateCommentById(commentId, content);

    successResponse(res, updatedComment, "Comment updated successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to update comment", 500);
  }
};

module.exports = updateCommentController;
