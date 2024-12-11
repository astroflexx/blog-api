import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

const API_URL = import.meta.env.VITE_API_URL;

const PostDetail = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts/${postId}`);
        const data = await response.json();

        if (data.status === "success") {
          setPost(data.data);
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

  const handleBackToHome = () => {
    navigate("/");
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
          <div className="post-detail">
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p>
              <small>
                Posted on {new Date(post.created_at).toLocaleString()}
              </small>
            </p>
            {post.updated_at && (
              <p>
                <small>
                  Last updated on {new Date(post.updated_at).toLocaleString()}
                </small>
              </p>
            )}
          </div>
        </>
      )}

      <div className="mt-4">
        <button className="btn btn-primary" onClick={handleBackToHome}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

PostDetail.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  username: PropTypes.string,
};

export default PostDetail;
