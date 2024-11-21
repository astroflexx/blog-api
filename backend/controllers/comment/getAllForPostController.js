const { getCommentsByPostId } = require("../db/queries");
const { successResponse, errorResponse } = require("../utils/response");

const getAllForPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await getCommentsByPostId(postId);

    successResponse(res, comments, "Comments retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to fetch comments", 500);
  }
};

module.exports = getAllForPost;
