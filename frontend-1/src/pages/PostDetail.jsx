import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Post from "../components/Post";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;

const PostDetail = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts/${postId}`);
        const data = await response.json();

        if (data.status === "success") {
          setPost(data.data);
          setComments(data.data.comments);
        } else {
          setError(data.message);
        }
      } catch (error) {
        console.error(error);
        setError("Failed to fetch post data.");
      }
    };

    fetchPostData();
  }, [postId]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleAddComment = async (newComment) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newComment),
      });

      const data = await response.json();

      if (data.status === "success") {
        setComments([...comments, data.data]);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to post comment.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/posts/${postId}/comments/${commentId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setComments(comments.filter((comment) => comment.id !== commentId));
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to delete comment.");
    }
  };

  const handleUpdateComment = async (updatedComment, commentId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${API_URL}/api/posts/${postId}/comments/${commentId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedComment),
        }
      );

      const data = await response.json();

      if (data.status === "success") {
        setComments(
          comments.map((comment) =>
            comment.id === commentId
              ? { ...comment, content: updatedComment.content }
              : comment
          )
        );
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error(error);
      setError("Failed to update comment.");
    }
  };

  return (
    <div className="container mt-5">
      <h1>Blog App</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      {isLoggedIn ? (
        <div className="d-flex justify-content-between">
          <p>Logged in as {username}</p>
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      ) : (
        <div className="d-flex justify-content-between">
          <p>
            <a href="/signup">Sign Up</a> | <a href="/login">Login</a>
          </p>
        </div>
      )}

      {post && (
        <>
          <Post post={post} />
          <CommentList
            comments={comments}
            isLoggedIn={isLoggedIn}
            username={username}
            onDeleteComment={handleDeleteComment}
            onUpdateComment={handleUpdateComment}
          />
          {isLoggedIn && <CommentForm onAddComment={handleAddComment} />}
        </>
      )}
    </div>
  );
};

PostDetail.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  username: PropTypes.string,
};

export default PostDetail;
