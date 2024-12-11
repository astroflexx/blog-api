const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createUser = async (email, password, username) => {
  return prisma.user.create({
    data: {
      email,
      password,
      username,
    },
  });
};

const findUserByEmail = async (email) => {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      username: true,
      password: true,
    },
  });
};

const findUserByUsername = async (username) => {
  return prisma.user.findUnique({
    where: { username },
  });
};

const findUserById = async (id) => {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
    },
  });
};

const getAllPublishedPosts = async () => {
  return prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
      comments: true,
    },
  });
};

const getPostsByUserId = async (userId) => {
  return prisma.post.findMany({
    where: {
      author_id: userId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
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
          username: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
    },
  });
};

const createPost = async (title, content, published, authorId) => {
  return prisma.post.create({
    data: {
      title,
      content,
      published,
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
          username: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      },
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
    include: {
      author: {
        select: {
          id: true,
          username: true,
        }
      }
    }
  });
};

const getCommentById = async (commentId) => {
  return prisma.comment.findUnique({
    where: { id: commentId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
    },
  });
};

const updateComment = async (commentId, content) => {
  return prisma.comment.update({
    where: { id: commentId },
    data: {
      content,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
        },
      },
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
  findUserByUsername,
  findUserById,
  getAllPublishedPosts,
  getPostsByUserId,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  createComment,
  getCommentById,
  updateComment,
  deleteComment,
};
