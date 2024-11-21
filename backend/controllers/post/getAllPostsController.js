const { getAllPosts } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");

const getAllPostsController = async (req, res) => {
  try {
    const posts = await getAllPosts();

    successResponse(res, posts, "Posts retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to fetch posts", 500);
  }
};

module.exports = getAllPostsController;
