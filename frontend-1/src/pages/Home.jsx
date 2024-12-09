import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const Home = ({ isLoggedIn, setIsLoggedIn, username }) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts?admin=false`);
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

      <main>
        <h2>All Posts</h2>
        <ul className="list-group">
          {posts.length > 0 ? (
            posts.map((post) => (
              <li key={post.id} className="list-group-item">
                <Link to={`/posts/${post.id}`} className="text-decoration-none">
                  {post.title}
                </Link>
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
