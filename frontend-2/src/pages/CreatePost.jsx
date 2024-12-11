import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const CreatePost = ({ isLoggedIn }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      setError("Title and Content are required.");
      return;
    }

    const postData = {
      title,
      content,
      published,
    };

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/api/posts`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate("/");
    } catch (err) {
      console.error("Failed to create post:", err);
      setError("Failed to create post. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Post</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="content" className="form-label">
            Content
          </label>
          <textarea
            className="form-control"
            id="content"
            rows="5"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="published" className="form-check-label">
            Published
          </label>
          <input
            type="checkbox"
            className="form-check-input"
            id="published"
            checked={published}
            onChange={() => setPublished(!published)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
};

CreatePost.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default CreatePost;
