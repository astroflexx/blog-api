const prisma = require("@prisma/client");

const createUser = async (email, password) => {
  return prisma.user.create({
    data: {
      email,
      password,
    },
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
  });
};

const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

const getAllPosts = async (limit, offset) => {
  return prisma.post.findMany({
    take: limit,
    skip: offset,
    include: {
      author: true,
      comments: true,
    },
  });
};

const getPostById = async (postId) => {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: true,
      comments: true,
    },
  });
};

const createPost = async (title, content, authorId) => {
  return prisma.post.create({
    data: {
      title,
      content,
      author_id: authorId,
    },
  });
};

const updatePost = async (postId, title, content) => {
  return prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      updated_at: new Date(),
    },
  });
};

const deletePost = async (postId) => {
  return prisma.post.delete({
    where: { id: postId },
  });
};

const createComment = async (content, postId, authorId) => {
  return prisma.comment.create({
    data: {
      content,
      post_id: postId,
      author_id: authorId,
    },
  });
};

const getCommentsByPostId = async (postId) => {
  return prisma.comment.findMany({
    where: { post_id: postId },
    include: { author: true },
  });
};

const updateComment = async (commentId, content) => {
  return prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
      updated_at: new Date(),
    },
  });
};

const deleteComment = async (commentId) => {
  return prisma.comment.delete({
    where: { id: commentId },
  });
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  createComment,
  getCommentsByPostId,
  updateComment,
  deleteComment,
};
