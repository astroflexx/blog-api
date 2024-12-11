import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Home = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get(`${API_URL}/api/posts?admin=true`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setPosts(response.data.data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  const handleDeletePost = async (postId) => {
    const token = localStorage.getItem("token");
    try {
      await axios.delete(`${API_URL}/api/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPosts(posts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <div className="container mt-5">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1>Blog App</h1>
        {isLoggedIn ? (
          <div>
            <span className="me-3">Welcome, {username}!</span>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div>
            <Link to="/signup" className="btn btn-primary btn-sm me-2">
              Sign Up
            </Link>
            <Link to="/login" className="btn btn-secondary btn-sm">
              Login
            </Link>
          </div>
        )}
      </header>

      {isLoggedIn && (
        <div className="mb-4">
          <Link to="/posts/create" className="btn btn-primary btn-sm">
            Create New Post
          </Link>
        </div>
      )}

      <main>
        <h2>All Posts</h2>
        <ul className="list-group">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li
                key={post.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <Link to={`/posts/${post.id}`} className="text-decoration-none">
                  {post.title}
                </Link>
                <span
                  className={`badge ms-3 ${
                    post.published ? "bg-success" : "bg-warning"
                  }`}
                >
                  {post.published ? "Published" : "Unpublished"}
                </span>
                {isLoggedIn && (
                  <div>
                    <Link
                      to={`/posts/${post.id}/update`}
                      className="btn btn-warning btn-sm me-2"
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </li>
            ))
          ) : (
            <p className="text-muted">No posts available.</p>
          )}
        </ul>
      </main>
    </div>
  );
};

Home.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  setIsLoggedIn: PropTypes.func.isRequired,
  username: PropTypes.string,
};

export default Home;
