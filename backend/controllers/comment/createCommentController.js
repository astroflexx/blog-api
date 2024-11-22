const { createComment } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const createCommentController = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content } = req.body;
    const { userId } = req.user;

    const newComment = await createComment(content, parseInt(postId), parseInt(userId));

    successResponse(res, newComment, "Comment created successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to create comment", 500);
  }
};

module.exports = createCommentController;
