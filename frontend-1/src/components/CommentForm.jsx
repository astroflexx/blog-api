import { useState } from "react";
import PropTypes from "prop-types";

const CommentForm = ({ onAddComment }) => {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim().length === 0) {
      setError("Content is required.");
      return;
    }

    onAddComment({ content });
    setContent("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-3">
      <div className="mb-3">
        <textarea
          className={`form-control ${error ? "is-invalid" : ""}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          rows="3"
          required
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Add Comment
      </button>
    </form>
  );
};

CommentForm.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default CommentForm;
