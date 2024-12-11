import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const UpdatePost = ({ isLoggedIn }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { postId } = useParams();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/posts/${postId}`);
        const post = response.data.data;
        setTitle(post.title);
        setContent(post.content);
        setPublished(post.published);
      } catch (err) {
        console.error("Failed to fetch post:", err);
        setError("Failed to load post data. Please try again.");
      }
    };

    fetchPost();
  }, [postId]);

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
      await axios.put(`${API_URL}/api/posts/${postId}`, postData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      navigate(`/posts/${postId}`);
    } catch (err) {
      console.error("Failed to update post:", err);
      setError("Failed to update post. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Update Post</h2>
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
          Update Post
        </button>
      </form>
    </div>
  );
};

UpdatePost.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};

export default UpdatePost;
