const { getAllPublishedPosts, getPostsByUserId } = require("../../db/queries");
const { successResponse, errorResponse } = require("../../utils/response");
const { verifyToken } = require("../../utils/jwt");

const getAllPostsController = async (req, res) => {
  try {
    let posts;

    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      posts = await getAllPublishedPosts();
    } else {
      const verifiedToken = verifyToken(token);

      if (!verifiedToken) {
        posts = await getAllPublishedPosts();
      } else {
        const isAdmin = req.query.admin === "true";
        const { userId } = verifiedToken;

        if (isAdmin) {
          posts = await getPostsByUserId(parseInt(userId));
        } else {
          posts = await getAllPublishedPosts();
        }
      }
    }

    successResponse(res, posts, "Posts retrieved successfully");
  } catch (err) {
    console.error(err);
    errorResponse(res, "Failed to fetch posts", 500);
  }
};

module.exports = getAllPostsController;
