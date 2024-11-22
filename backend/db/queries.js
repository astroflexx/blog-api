const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

const getAllPosts = async () => {
  return prisma.post.findMany({
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
      comments: true,
    },
  });
};

const getPostById = async (postId) => {
  return prisma.post.findUnique({
    where: { id: postId },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
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

const updatePost = async (postId, title, content, published) => {
  return prisma.post.update({
    where: { id: postId },
    data: {
      title,
      content,
      published,
      updated_at: new Date(),
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        },
      },
      comments: true,
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

const getCommentById = async (commentId) => {
  return prisma.comment.findUnique({
    where: { id: commentId },
  });
};

const updateComment = async (commentId, content) => {
  return prisma.comment.update({
    where: { id: commentId },
    data: {
      content
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        }
      }
    }
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
  getCommentById, 
  updateComment,
  deleteComment,
};
